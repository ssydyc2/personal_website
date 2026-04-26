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
];

export default function Books() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-light text-gray-900">Reading List</h1>

      <div className="space-y-4">
        {books.map((book) => (
          <article
            key={book.id}
            className="border border-gray-100 rounded-lg bg-white p-6 shadow-sm"
          >
            <h2 className="text-xl font-medium text-gray-900 leading-snug">
              {book.title}
            </h2>
            <div className="mt-4 border-l-2 border-indigo-200 pl-4">
              <p className="text-sm uppercase tracking-wide text-gray-400 mb-1">
                My Comment
              </p>
              <p className="text-gray-600 leading-relaxed">{book.comment}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
