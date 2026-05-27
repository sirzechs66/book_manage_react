import React, { useState } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import SearchFilter from './components/SearchFilter';
import useBooks from './hooks/useBooks';

function App() {
  const {
    books,
    loading,
    error,
    addBook,
    updateBook,
    deleteBook,
    refresh,
  } = useBooks();

  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [editing, setEditing] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  // Filter and search logic
  const genres = Array.from(new Set(books.map(b => b.genre))).sort();
  const filtered = books.filter(b => {
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = !genre || b.genre === genre;
    return matchesSearch && matchesGenre;
  });

  // Handlers
  const handleEdit = (book) => {
    setEditing(book);
    setFormOpen(true);
  };
  const handleAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const handleFormClose = () => {
    setFormOpen(false);
    setEditing(null);
  };
  const handleFormSubmit = async (data) => {
    if (editing) {
      await updateBook(editing.id, data);
    } else {
      await addBook(data);
    }
    handleFormClose();
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4 text-center">Book Management System</h1>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <SearchFilter
          search={search}
          setSearch={setSearch}
          genre={genre}
          setGenre={setGenre}
          genres={genres}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleAdd}
        >
          Add Book
        </button>
      </div>
      <BookList
        books={filtered}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onDelete={deleteBook}
      />
      {formOpen && (
        <BookForm
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          initialData={editing}
          loading={loading}
          error={error}
        />
      )}
    </div>
  );
}

export default App;
