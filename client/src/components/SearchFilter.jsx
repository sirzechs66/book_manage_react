import React from 'react';

function SearchFilter({ search, setSearch, genre, setGenre, genres }) {
  return (
    <div className="flex gap-2 items-center">
      <input
        className="border p-2 rounded"
        placeholder="Search by title or author"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <select
        className="border p-2 rounded"
        value={genre}
        onChange={e => setGenre(e.target.value)}
      >
        <option value="">All Genres</option>
        {genres.map(g => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>
    </div>
  );
}

export default SearchFilter;
