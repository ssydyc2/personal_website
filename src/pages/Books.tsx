interface Book {
  id: string;
  title: string;
  comment: string;
}

const books: Book[] = [
  {
    id: 'almanack-of-naval-ravikant',
    title: 'The Almanack of Naval Ravikant: A Guide to Wealth and Happiness',
    comment: 'Must read for how to build wealth (on specific knowledge) and happiness',
  },
  {
    id: 'the-psychology-of-money',
    title: 'The Psychology of Money',
    comment: 'Must read on how to keep wealth.',
  },
];

function PixelReadingScene() {
  const renderShelfItems = () => (
    <>
      <span className="pixel-books__book pixel-books__book--teal" />
      <span className="pixel-books__book pixel-books__book--amber" />
      <span className="pixel-books__book pixel-books__book--ink" />
      <span className="pixel-books__book pixel-books__book--paper" />
      <span className="pixel-books__book pixel-books__book--green" />
      <span className="pixel-books__book pixel-books__book--thin" />
      <span className="pixel-books__book pixel-books__book--amber pixel-books__book--wide" />
      <span className="pixel-books__book pixel-books__book--teal pixel-books__book--short" />
      <span className="pixel-books__book pixel-books__book--ink" />
      <span className="pixel-books__book pixel-books__book--paper pixel-books__book--thin" />
      <span className="pixel-books__book pixel-books__book--green pixel-books__book--wide" />
      <span className="pixel-books__book pixel-books__book--amber pixel-books__book--thin" />
      <span className="pixel-books__book pixel-books__book--ink pixel-books__book--short" />
      <span className="pixel-books__book pixel-books__book--teal" />
      <span className="pixel-books__book pixel-books__book--paper" />
      <span className="pixel-books__book pixel-books__book--amber" />
      <span className="pixel-books__book pixel-books__book--green pixel-books__book--short" />
      <span className="pixel-books__book pixel-books__book--ink pixel-books__book--thin" />
      <span className="pixel-books__book pixel-books__book--teal pixel-books__book--wide" />
      <span className="pixel-books__book pixel-books__book--paper pixel-books__book--short" />
      <span className="pixel-books__book pixel-books__book--amber pixel-books__book--wide" />
      <span className="pixel-books__book pixel-books__book--green" />
      <span className="pixel-books__book pixel-books__book--ink" />
      <span className="pixel-books__book pixel-books__book--teal pixel-books__book--thin" />
      <span className="pixel-books__featured-book">
        <span className="pixel-books__featured-page" />
      </span>
    </>
  );

  return (
    <div className="pixel-scene pixel-books" aria-hidden="true">
      <div className="pixel-books__shelves">
        <div className="pixel-books__shelf-row">
          <div className="pixel-books__shelf-strip">{renderShelfItems()}</div>
        </div>
      </div>
    </div>
  );
}

export default function Books() {
  return (
    <div className="space-y-8">
      <header>
        <PixelReadingScene />
        <h1 className="font-serif text-3xl font-normal text-[#20231f]">Reading List</h1>
      </header>

      <div className="space-y-4">
        {books.map((book) => (
          <article
            key={book.id}
            className="border border-[#d8cec0] bg-[#fffdf7] p-6 shadow-[3px_3px_0_#d8cec0]"
          >
            <h2 className="text-xl font-medium leading-snug text-[#20231f]">
              {book.title}
            </h2>
            <div className="mt-4 border-l-2 border-[#0f766e] pl-4">
              <p className="mb-1 font-mono text-xs uppercase tracking-[0.16em] text-[#8a9188]">
                My Comment
              </p>
              <p className="leading-relaxed text-[#61685f]">{book.comment}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
