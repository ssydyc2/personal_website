import { useState, useEffect } from 'react';

interface Paper {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  topic: string;
  link: string;
  color: string;
  accentColor: string;
}

const papers: Paper[] = [
  {
    id: 'flash-attention-v1',
    title: 'FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness',
    authors: 'Tri Dao, Daniel Y. Fu, Stefano Ermon, Atri Rudra, Christopher Ré',
    venue: 'NeurIPS',
    year: 2022,
    topic: 'FlashAttention v1',
    link: 'https://arxiv.org/abs/2205.14135',
    color: 'from-orange-600 via-red-500 to-rose-600',
    accentColor: 'text-orange-600',
  },
  {
    id: 'flash-attention-v2',
    title: 'FlashAttention-2: Faster Attention with Better Parallelism and Work Partitioning',
    authors: 'Tri Dao',
    venue: 'ICLR',
    year: 2024,
    topic: 'FlashAttention v2',
    link: 'https://arxiv.org/abs/2307.08691',
    color: 'from-violet-600 via-purple-600 to-fuchsia-600',
    accentColor: 'text-violet-600',
  },
  {
    id: 'paged-attention',
    title: 'Efficient Memory Management for Large Language Model Serving with PagedAttention',
    authors: 'Woosuk Kwon, Zhuohan Li, Siyuan Zhuang, et al.',
    venue: 'SOSP',
    year: 2023,
    topic: 'PagedAttention/vLLM',
    link: 'https://arxiv.org/abs/2309.06180',
    color: 'from-emerald-600 via-teal-500 to-cyan-600',
    accentColor: 'text-emerald-600',
  },
];

function PaperCard({ paper, index }: { paper: Paper; index: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 150);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
      }}
    >
      <div className={`bg-gradient-to-r ${paper.color} px-6 py-4`}>
        <div className="flex items-center justify-between">
          <span className="text-white text-lg font-bold tracking-wide">{paper.topic}</span>
          <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs font-medium">
            {paper.venue} {paper.year}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 leading-snug">
          {paper.title}
        </h3>

        <p className="text-sm text-gray-500">{paper.authors}</p>

        <a
          href={paper.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 ${paper.accentColor} font-medium hover:underline text-sm`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          Read on arXiv
        </a>
      </div>
    </div>
  );
}

export default function PapersContent() {
  return (
    <div className="space-y-6">
      {papers.map((paper, index) => (
        <PaperCard key={paper.id} paper={paper} index={index} />
      ))}
    </div>
  );
}
