
const cors = require('koa2-cors');
const helmet = require('koa-helmet');
const Koa = require('koa');
const logger = require('koa-pino-logger');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const { responseTime, cache } = require('./middleware');
const { v4 } = require('./services');

const app = new Koa();

mongoose.connect(process.env.SPACEX_MONGO, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on('error', (err) => {
  console.error(err);
});
db.once('open', () => {
  console.log('Mongo ready');
  app.emit('ready');
});

app.use(bodyParser());

// HTTP header security
app.use(helmet());

// Request logging
app.silent = true; // disable console.errors
app.use(logger());

// Enable CORS for all routes
app.use(cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowHeaders: ['Content-Type', 'Accept'],
  exposeHeaders: ['spacex-api-cache', 'spacex-api-response-time'],
}));

// Set header with API response time
app.use(responseTime);

// Disable Redis caching unless production
if (process.env.NODE_ENV === 'production') {
  app.use(cache.middleware());
}

// V4 routes
app.use(v4.routes());

module.exports = app;
