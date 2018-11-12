
const cache = require('koa-redis-cache');
const compress = require('koa-compress');
const cors = require('koa2-cors');
const helmet = require('koa-helmet');
const Koa = require('koa');
const logger = require('koa-morgan');
const mask = require('koa-json-mask');
const MongoClient = require('mongodb');
const json = require('./middleware/json');
const options = require('./middleware/redis');

// v2 route imports
const v2_capsules = require('./routes/v2/capsules');
const v2_errors = require('./routes/v2/errors');
const v2_home = require('./routes/v2/home');
const v2_info = require('./routes/v2/info');
const v2_launches = require('./routes/v2/launches');
const v2_launchpads = require('./routes/v2/launchpad');
const v2_missions = require('./routes/v2/missions');
const v2_parts = require('./routes/v2/parts');
const v2_payloads = require('./routes/v2/payloads');
const v2_rockets = require('./routes/v2/rockets');
const v2_upcoming = require('./routes/v2/upcoming');

// v3 route imports
const v3_capsules = require('./routes/v3/capsules');
const v3_cores = require('./routes/v3/cores');
const v3_dragons = require('./routes/v3/dragons');
const v3_history = require('./routes/v3/history');
const v3_info = require('./routes/v3/info');
const v3_launches = require('./routes/v3/rockets');
const v3_launchpads = require('./routes/v3/launchpad');
const v3_landpads = require('./routes/v3/landpad');
const v3_missions = require('./routes/v3/missions');
const v3_payloads = require('./routes/v3/payloads');
const v3_rockets = require('./routes/v3/launches');
const v3_roadster = require('./routes/v3/roadster');
const v3_ships = require('./routes/v3/ships');

// Production read-only DB
const url = process.env.MONGO_URL || 'mongodb+srv://public:spacex@spacex-gpg0u.mongodb.net/spacex-api';

const app = new Koa();

// Gzip all responses
app.use(compress());

// Set header with API response time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// HTTP header security
app.use(helmet());

// HTTP requests logger
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('[:date[clf]] ":method :url HTTP/:http-version" :status - :response-time ms'));
}

// Error Handler
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    if (ctx.status === 404) {
      ctx.body = {
        error: 'Not Found',
      };
    } else {
      ctx.body = {
        error: 'Internal Server Error',
      };
    }
    ctx.app.emit('error', err, ctx);
  }
});

// Enable CORS for all routes
app.use(cors({
  origin: '*',
  allowMethods: ['GET', 'POST'],
  allowHeaders: ['Content-Type', 'Accept'],
}));

// Disable Redis caching unless production
if (process.env.NODE_ENV === 'production') {
  app.use(cache(options));
}

// Allow user to restrict the keys returned
app.use(mask({
  name: 'filter',
}));

// Allow pretty print via pretty=true querystring
// Pretty printed json will NOT be cached
app.use(json({ pretty: false, param: { pretty: true } }));

// v2 routes
app.use(v2_capsules.routes());
app.use(v2_errors.routes());
app.use(v2_home.routes());
app.use(v2_info.routes());
app.use(v2_launchpads.routes());
app.use(v2_launches.routes());
app.use(v2_missions.routes());
app.use(v2_parts.routes());
app.use(v2_payloads.routes());
app.use(v2_rockets.routes());
app.use(v2_upcoming.routes());

// v3 routes
app.use(v3_capsules.routes());
app.use(v3_cores.routes());
app.use(v3_dragons.routes());
app.use(v3_history.routes());
app.use(v3_info.routes());
app.use(v3_launches.routes());
app.use(v3_launchpads.routes());
app.use(v3_landpads.routes());
app.use(v3_missions.routes());
app.use(v3_payloads.routes());
app.use(v3_rockets.routes());
app.use(v3_roadster.routes());
app.use(v3_ships.routes());

module.exports = app;

// Mongo Connection + Server Start
(async () => {
  try {
    const client = await MongoClient.connect(url, { poolSize: 20, useNewUrlParser: true });

    global.db = client.db('spacex-api');

    const port = process.env.PORT || 5000;
    app.listen(port, '0.0.0.0', () => {
      app.emit('ready');
      console.log('Running on port 5000');
    });
  } catch (err) {
    console.log(err.stack);
  }
})();
