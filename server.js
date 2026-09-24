const app = require('./app');

// Use the PORT provided by hosting services, or default to 5000 for local development
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Hotel Package Tracker Server running on http://localhost:${PORT}`);
});
