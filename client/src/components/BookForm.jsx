import React, { useState, useEffect } from 'react';

function BookForm({ onClose, onSubmit, initialData, loading, error }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [author, setAuthor] = useState(initialData?.author || '');
  const [genre, setGenre] = useState(initialData?.genre || '');
  const [year, setYear] = useState(initialData?.year || '');
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    setTitle(initialData?.title || '');
    setAuthor(initialData?.author || '');
    setGenre(initialData?.genre || '');
    setYear(initialData?.year || '');
    setFormError(null);
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);
    if (!title.trim() || !author.trim() || !year) {
      setFormError('Title, author, and year are required.');
      return;
    }
    const yearNum = Number(year);
    const currentYear = new Date().getFullYear();
    if (yearNum < 1000 || yearNum > currentYear) {
      setFormError(`Year must be between 1000 and ${currentYear}.`);
      return;
    }
    onSubmit({ title, author, genre, year: yearNum });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-md relative"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4">{initialData ? 'Edit Book' : 'Add Book'}</h2>
        <div className="mb-2">
          <label className="block mb-1">Title</label>
          <input
            className="w-full border p-2 rounded"
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Author</label>
          <input
            className="w-full border p-2 rounded"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Genre</label>
          <input
            className="w-full border p-2 rounded"
            value={genre}
            onChange={e => setGenre(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Publication Year</label>
          <input
            className="w-full border p-2 rounded"
            type="number"
            value={year}
            onChange={e => setYear(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        {(formError || error) && (
          <div className="error mb-2">{formError || error}</div>
        )}
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Saving...' : (initialData ? 'Save Changes' : 'Add Book')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookForm;
