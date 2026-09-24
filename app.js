const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for front-end requests
app.use(cors());
app.use(express.json());

// Routes
const packageRoutes = require('./routes/packages');
app.use('/api/packages', packageRoutes);

module.exports = app;
