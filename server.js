const http = require('http');
const mongoose = require('mongoose');
const { logger } = require('./middleware/logger');
const app = require('./app');

const PORT = process.env.PORT || 6673;
const SERVER = http.createServer(app.callback());

// Gracefully close Mongo connection
const gracefulShutdown = (msg) => {
  logger.info(`Shutdown initiated: ${msg}`);
  mongoose.connection.close(false, () => {
    logger.info('Mongo closed');
    SERVER.close(() => {
      logger.info('Shutting down...');
      process.exit();
    });
  });
};

// Server start
app.on('ready', () => {
  SERVER.listen(PORT, '0.0.0.0', () => {
    logger.info(`Running on port: ${PORT}`);

    // Handle kill commands
    process.on('SIGTERM', gracefulShutdown);

    // Handle interrupts
    process.on('SIGINT', gracefulShutdown);

    // Prevent dirty exit on uncaught exceptions:
    process.on('uncaughtException', gracefulShutdown);

    // Prevent dirty exit on unhandled promise rejection
    process.on('unhandledRejection', gracefulShutdown);
  });
});
