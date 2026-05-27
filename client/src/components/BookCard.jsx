import React from 'react';

function BookCard({ book, onEdit, onDelete }) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-2">{book.title}</td>
      <td className="p-2">{book.author}</td>
      <td className="p-2">{book.genre}</td>
      <td className="p-2">{book.year}</td>
      <td className="p-2 flex gap-2">
        <button
          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
          onClick={() => onEdit(book)}
        >
          Edit
        </button>
        <button
          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
          onClick={() => onDelete(book.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default BookCard;
