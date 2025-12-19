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

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
