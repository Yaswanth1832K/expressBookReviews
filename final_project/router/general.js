const express = require('express');
let books = require("./booksdb.js");
const axios = require("axios");

const public_users = express.Router();

// Task 6 – Register new user
let users = require("./auth_users.js").users;

public_users.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }
  const exists = users.find(u => u.username === username);
  if (exists) {
    return res.status(409).json({ message: "User already exists" });
  }
  users.push({ username, password });
  return res.status(200).json({ message: "User registered successfully" });
});

// Task 1 – Get all books
public_users.get('/', (req, res) => {
  res.status(200).json(books);
});

// Task 2 – Get book by ISBN
public_users.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  res.status(200).json(books[isbn]);
});

// Task 3 – Get books by author
public_users.get('/author/:author', (req, res) => {
  const author = req.params.author;
  let result = [];
  for (let key in books) {
    if (books[key].author === author) {
      result.push(books[key]);
    }
  }
  res.status(200).json(result);
});

// Task 4 – Get books by title
public_users.get('/title/:title', (req, res) => {
  const title = req.params.title;
  let result = [];
  for (let key in books) {
    if (books[key].title === title) {
      result.push(books[key]);
    }
  }
  res.status(200).json(result);
});

// Task 5 – Get reviews
public_users.get('/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  res.status(200).json(books[isbn].reviews);
});

/* ===== ASYNC / PROMISE TASKS (10–13) ===== */

// Task 10 – Async get all books
public_users.get('/async/books', async (req, res) => {
  res.status(200).json(books);
});

// Task 11 – Async get by ISBN
public_users.get('/async/isbn/:isbn', async (req, res) => {
  res.status(200).json(books[req.params.isbn]);
});

// Task 12 – Async get by author
public_users.get('/async/author/:author', async (req, res) => {
  const author = req.params.author;
  let result = [];
  for (let key in books) {
    if (books[key].author === author) {
      result.push(books[key]);
    }
  }
  res.status(200).json(result);
});

// Task 13 – Async get by title
public_users.get('/async/title/:title', async (req, res) => {
  const title = req.params.title;
  let result = [];
  for (let key in books) {
    if (books[key].title === title) {
      result.push(books[key]);
    }
  }
  res.status(200).json(result);
});

module.exports.general = public_users;
