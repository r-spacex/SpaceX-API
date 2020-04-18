
const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 6673;
const SERVER = http.createServer(app.callback());

// Gracefully close Mongo connection
const gracefulShutdown = () => {
  mongoose.connection.close(false, () => {
    console.log('Mongo closed');
    SERVER.close(() => {
      console.log('Shutting down...');
    });
  });
};

// Server start
SERVER.listen(PORT, '0.0.0.0', () => {
  console.log(`Running on port: ${PORT}`);

  // Handle kill commands
  process.on('SIGTERM', gracefulShutdown);

  // Prevent dirty exit on code-fault crashes:
  process.on('uncaughtException', gracefulShutdown);
});
