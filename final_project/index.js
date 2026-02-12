const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use(
  "/customer",
  session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true
  })
);

// JWT authentication middleware
app.use("/customer/auth/*", (req, res, next) => {
  if (req.session.authorization) {
    const token = req.session.authorization['accessToken'];
    jwt.verify(token, "fingerprint_customer", (err, user) => {
      if (err) {
        return res.status(403).json({ message: "User not authenticated" });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(403).json({ message: "User not logged in" });
  }
});

const PORT = 5000;

// IMPORTANT: API routes MUST come BEFORE static file serving
app.use("/api", genl_routes);
app.use("/customer", customer_routes);

// Serve static files AFTER API routes
app.use(express.static('public'));

app.listen(PORT, () => console.log("Server is running on port 5000"));
