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

export default function Books() {
  return (
    <div className="space-y-8">
      <h1 className="font-serif text-3xl font-normal text-[#20231f]">Reading List</h1>

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
