// server/models.js
const pool = require('./db');

async function createTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      genre TEXT,
      year INTEGER
    )
  `);
}

async function getAllBooks() {
  const { rows } = await pool.query('SELECT * FROM books ORDER BY id');
  return rows;
}

async function createBook(book) {
  const { title, author, genre, year } = book;
  const { rows } = await pool.query(
    'INSERT INTO books (title, author, genre, year) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, author, genre, year]
  );
  return rows[0];
}

async function updateBook(id, book) {
  const { title, author, genre, year } = book;
  const { rows } = await pool.query(
    'UPDATE books SET title=$1, author=$2, genre=$3, year=$4 WHERE id=$5 RETURNING *',
    [title, author, genre, year, id]
  );
  return rows[0];
}

async function deleteBook(id) {
  await pool.query('DELETE FROM books WHERE id=$1', [id]);
}

async function seedBooks() {
  const { rows } = await pool.query('SELECT COUNT(*) FROM books');
  if (parseInt(rows[0].count, 10) === 0) {
    await pool.query(
      `INSERT INTO books (title, author, genre, year) VALUES
        ('The Great Gatsby', 'F. Scott Fitzgerald', 'Classic', 1925),
        ('To Kill a Mockingbird', 'Harper Lee', 'Fiction', 1960),
        ('A Brief History of Time', 'Stephen Hawking', 'Science', 1988)
      `
    );
  }
}

module.exports = {
  createTable,
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  seedBooks,
};
