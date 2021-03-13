const http = require('http');
const mongoose = require('mongoose');
const { logger } = require('./middleware/logger');
const app = require('./app');

const PORT = process.env.PORT || 6673;
const SERVER = http.createServer(app.callback());

const closeMongoConnection = () => {
  mongoose.connection.close(false, () => {
    logger.info('Mongo closed');
    SERVER.close(() => {
      logger.info('Shutting down...');
      process.exit();
    });
  });
};

function startServer() {
  SERVER.listen(PORT, '0.0.0.0', () => {
    logger.info(`Running on port: ${PORT}`);

    // Handle kill commands
    process.on('SIGTERM', closeMongoConnection);

    // Prevent dirty exit on code-fault crashes:
    process.on('uncaughtException', closeMongoConnection);

    // Prevent promise rejection exits
    process.on('unhandledRejection', closeMongoConnection);
  });
}

startServer();
