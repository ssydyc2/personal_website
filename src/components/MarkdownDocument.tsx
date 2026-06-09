import type { ReactNode } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

type InlineNode =
  | { type: 'text'; value: string }
  | { type: 'code'; value: string }
  | { type: 'math'; value: string }
  | { type: 'strong'; children: InlineNode[] }
  | { type: 'em'; children: InlineNode[] }
  | { type: 'link'; href: string; children: InlineNode[] };

type Block =
  | { type: 'heading'; level: number; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'hr' }
  | { type: 'code'; language: string; value: string }
  | { type: 'list'; ordered: boolean; items: ListItem[] }
  | { type: 'table'; headers: string[]; rows: string[][] };

interface ListItem {
  text: string;
  checked?: boolean;
  children: Block[];
}

interface ListMatch {
  indent: number;
  marker: string;
  content: string;
}

function parseInline(text: string): InlineNode[] {
  const nodes: InlineNode[] = [];
  let index = 0;

  while (index < text.length) {
    const next = findNextInlineToken(text, index);

    if (!next) {
      nodes.push({ type: 'text', value: text.slice(index) });
      break;
    }

    if (next.start > index) {
      nodes.push({ type: 'text', value: text.slice(index, next.start) });
    }

    nodes.push(next.node);
    index = next.end;
  }

  return nodes;
}

function findNextInlineToken(
  text: string,
  from: number,
): { start: number; end: number; node: InlineNode } | null {
  for (let index = from; index < text.length; index += 1) {
    if (text.startsWith('`', index)) {
      const end = text.indexOf('`', index + 1);

      if (end > index) {
        return {
          start: index,
          end: end + 1,
          node: { type: 'code', value: text.slice(index + 1, end) },
        };
      }
    }

    if (text.startsWith('\\(', index)) {
      const end = text.indexOf('\\)', index + 2);

      if (end > index) {
        return {
          start: index,
          end: end + 2,
          node: { type: 'math', value: text.slice(index + 2, end) },
        };
      }
    }

    if (text.startsWith('**', index)) {
      const end = text.indexOf('**', index + 2);

      if (end > index) {
        return {
          start: index,
          end: end + 2,
          node: { type: 'strong', children: parseInline(text.slice(index + 2, end)) },
        };
      }
    }

    if (text.startsWith('*', index)) {
      const end = text.indexOf('*', index + 1);

      if (end > index) {
        return {
          start: index,
          end: end + 1,
          node: { type: 'em', children: parseInline(text.slice(index + 1, end)) },
        };
      }
    }

    if (text.startsWith('[', index)) {
      const closeLabel = text.indexOf(']', index + 1);
      const openHref = closeLabel >= 0 ? text.indexOf('(', closeLabel) : -1;
      const closeHref = openHref >= 0 ? text.indexOf(')', openHref) : -1;

      if (closeLabel > index && openHref === closeLabel + 1 && closeHref > openHref) {
        return {
          start: index,
          end: closeHref + 1,
          node: {
            type: 'link',
            href: text.slice(openHref + 1, closeHref),
            children: parseInline(text.slice(index + 1, closeLabel)),
          },
        };
      }
    }
  }

  return null;
}

function renderMathToHtml(value: string, displayMode: boolean) {
  return katex.renderToString(value, {
    displayMode,
    throwOnError: false,
    strict: false,
  });
}

function parseMarkdown(markdown: string): Block[] {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks: Block[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (line.trim() === '') {
      index += 1;
      continue;
    }

    if (line.startsWith('```')) {
      const language = line.slice(3).trim();
      const codeLines: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index].startsWith('```')) {
        codeLines.push(lines[index]);
        index += 1;
      }

      blocks.push({ type: 'code', language, value: codeLines.join('\n') });
      index += index < lines.length ? 1 : 0;
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);

    if (heading) {
      blocks.push({
        type: 'heading',
        level: heading[1].length,
        text: heading[2],
      });
      index += 1;
      continue;
    }

    if (/^(-{3,}|\*{3,})\s*$/.test(line.trim())) {
      blocks.push({ type: 'hr' });
      index += 1;
      continue;
    }

    if (isTableStart(lines, index)) {
      const table = parseTable(lines, index);
      blocks.push(table.block);
      index = table.nextIndex;
      continue;
    }

    if (matchList(line)) {
      const list = parseList(lines, index, matchList(line)?.indent ?? 0);
      blocks.push(list.block);
      index = list.nextIndex;
      continue;
    }

    const paragraphLines: string[] = [];

    while (
      index < lines.length &&
      lines[index].trim() !== '' &&
      !isBlockBoundary(lines, index)
    ) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }

    blocks.push({ type: 'paragraph', text: paragraphLines.join(' ') });
  }

  return blocks;
}

function isBlockBoundary(lines: string[], index: number) {
  const line = lines[index];
  return (
    line.startsWith('```') ||
    /^(#{1,6})\s+/.test(line) ||
    /^(-{3,}|\*{3,})\s*$/.test(line.trim()) ||
    isTableStart(lines, index) ||
    matchList(line) !== null
  );
}

function matchList(line: string): ListMatch | null {
  const match = line.match(/^(\s*)([-+*]|\d+\.)\s+(.*)$/);

  if (!match) {
    return null;
  }

  return {
    indent: match[1].length,
    marker: match[2],
    content: match[3],
  };
}

function parseList(
  lines: string[],
  startIndex: number,
  baseIndent: number,
): { block: Block; nextIndex: number } {
  const firstMatch = matchList(lines[startIndex]);
  const ordered = firstMatch ? /^\d+\./.test(firstMatch.marker) : false;
  const items: ListItem[] = [];
  let index = startIndex;

  while (index < lines.length) {
    const match = matchList(lines[index]);

    if (!match || match.indent < baseIndent) {
      break;
    }

    if (match.indent > baseIndent) {
      const previous = items[items.length - 1];

      if (!previous) {
        break;
      }

      const child = parseList(lines, index, match.indent);
      previous.children.push(child.block);
      index = child.nextIndex;
      continue;
    }

    const checkbox = match.content.match(/^\[([ xX])\]\s+(.*)$/);
    items.push({
      text: checkbox ? checkbox[2] : match.content,
      checked: checkbox ? checkbox[1].toLowerCase() === 'x' : undefined,
      children: [],
    });
    index += 1;

    while (index < lines.length && lines[index].trim() === '') {
      const nextList = matchList(lines[index + 1] ?? '');

      if (!nextList || nextList.indent < baseIndent) {
        return { block: { type: 'list', ordered, items }, nextIndex: index + 1 };
      }

      index += 1;
    }
  }

  return { block: { type: 'list', ordered, items }, nextIndex: index };
}

function isTableStart(lines: string[], index: number) {
  const header = lines[index];
  const separator = lines[index + 1];

  return (
    header?.includes('|') &&
    separator !== undefined &&
    /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(separator)
  );
}

function parseTable(lines: string[], startIndex: number): { block: Block; nextIndex: number } {
  const headers = splitTableRow(lines[startIndex]);
  const rows: string[][] = [];
  let index = startIndex + 2;

  while (index < lines.length && lines[index].includes('|') && lines[index].trim() !== '') {
    rows.push(splitTableRow(lines[index]));
    index += 1;
  }

  return { block: { type: 'table', headers, rows }, nextIndex: index };
}

function splitTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

function renderInline(nodes: InlineNode[]): ReactNode {
  return nodes.map((node, index) => {
    if (node.type === 'text') {
      return node.value;
    }

    if (node.type === 'code') {
      return (
        <code key={index} className="border border-[#d8cec0] bg-[#eee7da] px-1.5 py-0.5 text-[0.92em] text-[#454b44]">
          {node.value}
        </code>
      );
    }

    if (node.type === 'math') {
      return (
        <span
          key={index}
          className="text-[#20231f]"
          dangerouslySetInnerHTML={{ __html: renderMathToHtml(node.value, false) }}
        />
      );
    }

    if (node.type === 'strong') {
      return (
        <strong key={index} className="font-semibold text-[#20231f]">
          {renderInline(node.children)}
        </strong>
      );
    }

    if (node.type === 'em') {
      return (
        <em key={index} className="text-[#454b44]">
          {renderInline(node.children)}
        </em>
      );
    }

    return (
      <a
        key={index}
        href={node.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-[#0f766e] underline decoration-[#9cc8bf] underline-offset-2 transition-colors hover:text-[#0b5f59]"
      >
        {renderInline(node.children)}
      </a>
    );
  });
}

function MarkdownList({ block }: { block: Extract<Block, { type: 'list' }> }) {
  const Tag = block.ordered ? 'ol' : 'ul';
  const hasCheckboxes = block.items.some((item) => item.checked !== undefined);
  const listClass = block.ordered
    ? 'my-5 list-decimal space-y-3 pl-6 text-[#61685f]'
    : hasCheckboxes
      ? 'my-5 list-none space-y-4 pl-0 text-[#61685f]'
      : 'my-5 list-disc space-y-3 pl-6 text-[#61685f]';

  return (
    <Tag className={listClass}>
      {block.items.map((item, index) => (
        <li key={`${item.text}-${index}`} className="leading-7 marker:text-[#b7791f]">
          <span className={item.checked === undefined ? '' : 'flex gap-3'}>
            {item.checked !== undefined && (
              <input
                aria-label={item.checked ? 'Completed' : 'Incomplete'}
                type="checkbox"
                checked={item.checked}
                readOnly
                className="mt-2 h-4 w-4 shrink-0 border-[#958979] accent-[#0f766e]"
              />
            )}
            <span>{renderInline(parseInline(item.text))}</span>
          </span>
          {item.children.map((child, childIndex) => (
            <MarkdownBlock key={`${item.text}-child-${childIndex}`} block={child} />
          ))}
        </li>
      ))}
    </Tag>
  );
}

function MathBlock({ value }: { value: string }) {
  const formulas = value
    .split(/\n\s*\n/)
    .map((formula) => formula.trim())
    .filter(Boolean);

  return (
    <div className="my-6 overflow-x-auto border-y border-[#958979] bg-[#eee7da] px-4 py-5">
      <div className="min-w-max space-y-5 text-[#20231f]">
        {formulas.map((formula, index) => (
          <div
            key={`${formula}-${index}`}
            dangerouslySetInnerHTML={{ __html: renderMathToHtml(formula, true) }}
          />
        ))}
      </div>
    </div>
  );
}

function MarkdownBlock({ block }: { block: Block }) {
  if (block.type === 'heading') {
    const content = renderInline(parseInline(block.text));

    if (block.level === 1) {
      return (
        <h1 className="mb-5 border-b border-[#958979] pb-5 font-serif text-4xl font-normal leading-tight text-[#20231f]">
          {content}
        </h1>
      );
    }

    if (block.level === 2) {
      return (
        <h2 className="mt-11 border-b border-[#958979] pb-3 font-serif text-2xl font-normal text-[#20231f]">
          {content}
        </h2>
      );
    }

    return <h3 className="mt-8 text-xl font-medium text-[#20231f]">{content}</h3>;
  }

  if (block.type === 'paragraph') {
    return <p className="my-5 text-base leading-8 text-[#61685f]">{renderInline(parseInline(block.text))}</p>;
  }

  if (block.type === 'hr') {
    return <hr className="my-9 border-[#958979]" />;
  }

  if (block.type === 'code') {
    if (block.language === 'latex') {
      return <MathBlock value={block.value} />;
    }

    return (
      <pre className="my-6 overflow-x-auto border border-[#958979] bg-[#eee7da] px-4 py-5 text-sm leading-7 text-[#454b44]">
        <code>{block.value}</code>
      </pre>
    );
  }

  if (block.type === 'list') {
    return <MarkdownList block={block} />;
  }

  return (
    <div className="my-6 overflow-x-auto">
      <table className="min-w-full border-y border-[#958979] bg-[#fffdf7]/70 text-left text-sm">
        <thead className="bg-[#eee7da] font-mono text-xs uppercase tracking-[0.12em] text-[#454b44]">
          <tr>
            {block.headers.map((header) => (
              <th key={header} className="border-b border-[#d8cec0] px-4 py-3 font-medium">
                {renderInline(parseInline(header))}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#d8cec0] text-[#61685f]">
          {block.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={`${rowIndex}-${cellIndex}`} className="px-4 py-3 align-top leading-6">
                  {renderInline(parseInline(cell))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function MarkdownDocument({ markdown }: { markdown: string }) {
  return (
    <article className="mx-auto max-w-3xl text-[16px]">
      {parseMarkdown(markdown).map((block, index) => (
        <MarkdownBlock key={index} block={block} />
      ))}
    </article>
  );
}
