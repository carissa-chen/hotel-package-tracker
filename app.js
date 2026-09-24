const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const packageRoutes = require('./routes/packages');
app.use('/api/packages', packageRoutes);

module.exports = app;
