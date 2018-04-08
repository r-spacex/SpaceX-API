
const cache = require('koa-redis-cache');
const compress = require('koa-compress');
const cors = require('koa2-cors');
const helmet = require('koa-helmet');
const Koa = require('koa');
const logger = require('koa-logger');
const MongoClient = require('mongodb');
const options = require('./db/redis');

const capsules = require('./v2-routes/v2-capsules');
const home = require('./v2-routes/v2-home');
const info = require('./v2-routes/v2-info');
const launchpad = require('./v2-routes/v2-launchpad');
const launches = require('./v2-routes/v2-launches');
const parts = require('./v2-routes/v2-parts');
const rockets = require('./v2-routes/v2-rockets');
const upcoming = require('./v2-routes/v2-upcoming');

// Production read-only DB
const url = 'mongodb+srv://public:spacex@spacex-api-rzdz4.mongodb.net/spacex-api';

const app = new Koa();

// Gzip all responses
app.use(compress());

// HTTP header security
app.use(helmet());

// Error Handler
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = {
      error: 'Internal Server Error',
    };
    ctx.app.emit('error', err, ctx);
  }
});

// Enable CORS for all routes
app.use(cors({
  origin: '*',
}));

// Hide logging when running tests
// Disable Redis caching when running tests
if (process.env.NODE_ENV !== 'test') {
  app.use(logger());
  app.use(cache(options));
}

// Koa routes
app.use(capsules.routes());
app.use(home.routes());
app.use(info.routes());
app.use(launchpad.routes());
app.use(launches.routes());
app.use(parts.routes());
app.use(rockets.routes());
app.use(upcoming.routes());

module.exports = app;

// Mongo Connection + Server Start
MongoClient.connect(url, (err, client) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  global.db = client.db('spacex-api');

  const port = process.env.PORT || 5000;
  app.listen(port, '0.0.0.0', () => {
    app.emit('ready');
  });
});
