const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const packageRoutes = require('./routes/packages');
app.use('/api/packages', packageRoutes);

// Error handler: request errors return JSON, never an HTML stack trace
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Bad Request: request body is not valid JSON.' });
  }
  const status = err.status || err.statusCode || 500;
  const message = status >= 500 ? 'Server Error: the request could not be completed.' : err.message;
  return res.status(status).json({ error: message });
});

module.exports = app;
