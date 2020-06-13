const http = require('http');
const mongoose = require('mongoose');
const { logger } = require('./middleware/logger');
const app = require('./app');

const PORT = process.env.PORT || 6673;
const SERVER = http.createServer(app.callback());

// Gracefully close Mongo connection
const gracefulShutdown = () => {
  mongoose.connection.close(false, () => {
    logger.info('Mongo closed');
    SERVER.close(() => {
      logger.info('Shutting down...');
    });
  });
};

// Server start
SERVER.listen(PORT, '0.0.0.0', () => {
  logger.info(`Running on port: ${PORT}`);

  // Handle kill commands
  process.on('SIGTERM', gracefulShutdown);

  // Prevent dirty exit on code-fault crashes:
  process.on('uncaughtException', gracefulShutdown);
});
