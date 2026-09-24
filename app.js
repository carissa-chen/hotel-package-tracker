const express = require('express');
const packagesRouter = require('./routes/packages');

const app = express();

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Register routes
app.use(packagesRouter);

module.exports = app;
