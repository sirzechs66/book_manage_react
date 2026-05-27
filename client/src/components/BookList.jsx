import React from 'react';
import BookCard from './BookCard';

function BookList({ books, loading, error, onEdit, onDelete }) {
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!books.length) return <div className="text-center">No books found.</div>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Author</th>
            <th className="p-2 text-left">Genre</th>
            <th className="p-2 text-left">Year</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;
