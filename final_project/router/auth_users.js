const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");

const regd_users = express.Router();
let users = [];

// Check username validity
const isValid = (username) => {
  return users.some(u => u.username === username);
};

// Authenticate user
const authenticatedUser = (username, password) => {
  return users.some(u => u.username === username && u.password === password);
};

// Task 7 – Login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!authenticatedUser(username, password)) {
    return res.status(403).json({ message: "Invalid login" });
  }
  const accessToken = jwt.sign({ username }, "fingerprint_customer", { expiresIn: '1h' });
  req.session.authorization = { accessToken };
  return res.status(200).json({ message: "Login successful" });
});

// Task 8 – Add or modify review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = jwt.decode(req.session.authorization.accessToken).username;

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  books[isbn].reviews[username] = review;
  return res.status(200).json({ message: "Review added/updated", reviews: books[isbn].reviews });
});

// Task 9 – Delete review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = jwt.decode(req.session.authorization.accessToken).username;

  if (books[isbn].reviews[username]) {
    delete books[isbn].reviews[username];
    return res.status(200).json({ message: "Review deleted" });
  }
  return res.status(404).json({ message: "Review not found" });
});

// Add new book (authenticated)
regd_users.post("/auth/book", (req, res) => {
  const { title, author, description, year, isbn, cover, rating } = req.body;
  const username = jwt.decode(req.session.authorization.accessToken).username;

  if (!title || !author) {
    return res.status(400).json({ message: "Title and author are required" });
  }

  // Find next available ID
  const maxId = Math.max(...Object.keys(books).map(Number));
  const newId = maxId + 1;

  books[newId] = {
    author,
    title,
    description: description || "No description available.",
    year: year || new Date().getFullYear(),
    isbn: isbn || `ISBN-${newId}-${Date.now()}`,
    cover: cover || "https://via.placeholder.com/280x350?text=No+Cover",
    rating: rating || 0,
    reviews: {},
    addedBy: username
  };

  return res.status(201).json({ message: "Book added successfully", book: books[newId], id: newId });
});

// Edit book (authenticated, own books only)
regd_users.put("/auth/book/:id", (req, res) => {
  const id = req.params.id;
  const username = jwt.decode(req.session.authorization.accessToken).username;
  const { title, author, description, year, isbn, cover, rating } = req.body;

  if (!books[id]) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (books[id].addedBy && books[id].addedBy !== username) {
    return res.status(403).json({ message: "You can only edit books you added" });
  }

  books[id] = {
    ...books[id],
    title: title || books[id].title,
    author: author || books[id].author,
    description: description || books[id].description,
    year: year || books[id].year,
    isbn: isbn || books[id].isbn,
    cover: cover || books[id].cover,
    rating: rating !== undefined ? rating : books[id].rating
  };

  return res.status(200).json({ message: "Book updated successfully", book: books[id] });
});

// Delete book (authenticated, own books only)
regd_users.delete("/auth/book/:id", (req, res) => {
  const id = req.params.id;
  const username = jwt.decode(req.session.authorization.accessToken).username;

  if (!books[id]) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (books[id].addedBy && books[id].addedBy !== username) {
    return res.status(403).json({ message: "You can only delete books you added" });
  }

  delete books[id];
  return res.status(200).json({ message: "Book deleted successfully" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
