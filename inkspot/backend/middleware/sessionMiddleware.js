// middleware/sessionMiddleware.js

const expressSession = require('express-session');

// Middleware function for session management
const sessionMiddleware = expressSession({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true } // Enable this if using HTTPS
});

module.exports = sessionMiddleware;
