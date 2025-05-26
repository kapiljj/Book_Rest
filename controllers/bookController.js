const { readBooks, writeBooks } = require('../models/bookModel');

// GET all books
exports.getBooks = (req, res) => {
  const books = readBooks();
  res.json(books);
};

// POST a new book
exports.addBook = (req, res) => {
  const books = readBooks();
  const newBook = { id: Date.now().toString(), ...req.body };
  books.push(newBook);
  writeBooks(books);
  res.status(201).json(newBook);
};

// PUT to update a book
exports.updateBook = (req, res) => {
  const books = readBooks();
  const { id } = req.params;
  const index = books.findIndex((book) => book.id === id);

  if (index === -1) return res.status(404).json({ error: 'Book not found' });

  books[index] = { ...books[index], ...req.body };
  writeBooks(books);
  res.json(books[index]);
};

// DELETE a book
exports.deleteBook = (req, res) => {
  const books = readBooks();
  const { id } = req.params;
  const updatedBooks = books.filter((book) => book.id !== id);

  if (books.length === updatedBooks.length)
    return res.status(404).json({ error: 'Book not found' });

  writeBooks(updatedBooks);
  res.status(204).send();
};
