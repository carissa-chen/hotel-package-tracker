const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hotel-tracker';

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    app.listen(PORT, HOST, () => {
      console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Database connection error:', error);
  }
}

startServer();
