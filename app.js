
const cors = require('koa2-cors');
const helmet = require('koa-helmet');
const Koa = require('koa');
const logger = require('koa-morgan');
const mongoose = require('mongoose');
const { responseTime, cache } = require('./middleware');
const { v4 } = require('./services');

const app = new Koa();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (err) => {
  console.error(err);
});
db.once('open', () => {
  console.log('Mongo ready');
  app.emit('ready');
});

// Set header with API response time
app.use(responseTime());

// HTTP header security
app.use(helmet());

// Request + General logging
app.use(logger());

// Enable CORS for all routes
app.use(cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Accept'],
  exposeHeaders: ['spacex-api-cache', 'spacex-api-count', 'spacex-api-response-time'],
}));

// Disable Redis caching unless production
if (process.env.NODE_ENV === 'production') {
  app.use(cache());
}

// V4 routes
app.use(v4.routes());

module.exports = app;
