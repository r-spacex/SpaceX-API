const conditional = require('koa-conditional-get');
const etag = require('koa-etag');
const cors = require('koa2-cors');
const helmet = require('koa-helmet');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const { logger } = require('./middleware/logger');
const { responseTime, errors } = require('./middleware');
const routes = require('./routes');

const app = new Koa();

mongoose.connect(process.env.SPACEX_MONGO, {
  bufferCommands: false,
});

const db = mongoose.connection;

db.on('error', (err) => {
  logger.error(err);
});
db.once('connected', () => {
  logger.info('Mongo connected');
  app.emit('ready');
});
db.on('reconnected', () => {
  logger.info('Mongo re-connected');
});
db.on('disconnected', () => {
  logger.info('Mongo disconnected');
});

// disable console.errors for pino
app.silent = true;

// Error handler
app.use(errors);

app.use(conditional());

app.use(etag());

app.use(bodyParser());

// HTTP header security
app.use(helmet());

// Enable CORS for all routes
app.use(cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowHeaders: ['Content-Type', 'Accept'],
  exposeHeaders: ['spacex-api-cache', 'spacex-api-response-time'],
}));

// Set header with API response time
app.use(responseTime);

// Request logging
// app.use(requestLogger);

// Register routes
app.use(routes());

module.exports = app;
