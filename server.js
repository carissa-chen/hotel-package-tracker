const app = require('./app');

const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0'; // Binds to all local network interfaces

app.listen(PORT, HOST, () => {
  console.log('🚀 Server running on http://127.0.0.1:${PORT}');
});