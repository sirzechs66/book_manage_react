const express = require('express');
const path = require('path');
const cors = require('cors');
const {
  createTable,
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  seedBooks,
} = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Serve static frontend
const clientBuildPath = path.join(__dirname, '../client/build');
app.use(express.static(clientBuildPath));

// Validation helper
function validateBook(book) {
  const errors = {};
  if (!book.title || !book.title.trim()) errors.title = 'Title is required.';
  if (!book.author || !book.author.trim()) errors.author = 'Author is required.';
  const year = Number(book.year);
  const currentYear = new Date().getFullYear();
  if (!year || year < 1000 || year > currentYear) errors.year = `Year must be between 1000 and ${currentYear}.`;
  return errors;
}

// API routes
app.get('/api/books', async (req, res) => {
  try {
    const books = await getAllBooks();
    res.json(books);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch books.' });
  }
});

app.post('/api/books', async (req, res) => {
  const errors = validateBook(req.body);
  if (Object.keys(errors).length) return res.status(400).json({ errors });
  try {
    const book = await createBook(req.body);
    res.status(201).json(book);
  } catch (e) {
    res.status(500).json({ error: 'Failed to add book.' });
  }
});

app.put('/api/books/:id', async (req, res) => {
  const errors = validateBook(req.body);
  if (Object.keys(errors).length) return res.status(400).json({ errors });
  try {
    const book = await updateBook(req.params.id, req.body);
    if (!book) return res.status(404).json({ error: 'Book not found.' });
    res.json(book);
  } catch (e) {
    res.status(500).json({ error: 'Failed to update book.' });
  }
});

app.delete('/api/books/:id', async (req, res) => {
  try {
    await deleteBook(req.params.id);
    res.status(204).end();
  } catch (e) {
    res.status(500).json({ error: 'Failed to delete book.' });
  }
});

// Fallback to frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// Initialize DB and start server
async function start() {
  await createTable();
  await seedBooks();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();
