
const cors = require('koa2-cors');
const helmet = require('koa-helmet');
const Koa = require('koa');
const logger = require('koa-morgan');
const mask = require('koa-json-mask');
const MongoClient = require('mongodb');
const json = require('./middleware/json');
const responseTime = require('./middleware/response-time');
const count = require('./middleware/count');
const cache = require('./middleware/redis-cache');
const errorHandler = require('./middleware/error-handler');
const options = require('./config/redis');

// v2 route imports
const v2Capsules = require('./routes/v2/capsules');
const v2Errors = require('./routes/v2/errors');
const v2Home = require('./routes/v2/home');
const v2Info = require('./routes/v2/info');
const v2Launches = require('./routes/v2/launches');
const v2Launchpads = require('./routes/v2/launchpad');
const v2Missions = require('./routes/v2/missions');
const v2Parts = require('./routes/v2/parts');
const v2Payloads = require('./routes/v2/payloads');
const v2Rockets = require('./routes/v2/rockets');
const v2Upcoming = require('./routes/v2/upcoming');

// v3 route imports
const v3Capsules = require('./routes/v3/capsules');
const v3Crew = require('./routes/v3/crew');
const v3Cores = require('./routes/v3/cores');
const v3Dragons = require('./routes/v3/dragons');
const v3History = require('./routes/v3/history');
const v3Info = require('./routes/v3/info');
const v3Launches = require('./routes/v3/rockets');
const v3Launchpads = require('./routes/v3/launchpad');
const v3Landpads = require('./routes/v3/landpad');
const v3Missions = require('./routes/v3/missions');
const v3Payloads = require('./routes/v3/payloads');
const v3Rockets = require('./routes/v3/launches');
const v3Roadster = require('./routes/v3/roadster');
const v3Ships = require('./routes/v3/ships');

// Production read-only DB
const url = process.env.MONGO_URL || 'mongodb+srv://public:spacex@spacex-gcp-gpg0u.gcp.mongodb.net/spacex-api';

const app = new Koa();

// Set header with API response time
app.use(responseTime());

// HTTP header security
app.use(helmet());

// HTTP requests logger
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('[:date[clf]] ":method :url HTTP/:http-version" :status - :response-time ms'));
}

// Error Handler
app.use(errorHandler());

// Enable CORS for all routes
app.use(cors({
  origin: '*',
  allowMethods: ['GET'],
  allowHeaders: ['Content-Type', 'Accept'],
  exposeHeaders: ['spacex-api-cache', 'spacex-api-count', 'spacex-api-response-time'],
}));

// Disable Redis caching unless production
if (process.env.NODE_ENV === 'production') {
  app.use(cache(options));
}

// Set header with total objects returned
app.use(count());

// Allow user to restrict the keys returned
app.use(mask({
  name: 'filter',
}));

// Allow pretty print via pretty=true querystring
// Pretty printed json will NOT be cached
app.use(json({ pretty: false, param: { pretty: true } }));

// v2 routes
app.use(v2Capsules.routes());
app.use(v2Errors.routes());
app.use(v2Home.routes());
app.use(v2Info.routes());
app.use(v2Launchpads.routes());
app.use(v2Launches.routes());
app.use(v2Missions.routes());
app.use(v2Parts.routes());
app.use(v2Payloads.routes());
app.use(v2Rockets.routes());
app.use(v2Upcoming.routes());

// v3 routes
app.use(v3Capsules.routes());
app.use(v3Cores.routes());
app.use(v3Crew.routes());
app.use(v3Dragons.routes());
app.use(v3History.routes());
app.use(v3Info.routes());
app.use(v3Launches.routes());
app.use(v3Launchpads.routes());
app.use(v3Landpads.routes());
app.use(v3Missions.routes());
app.use(v3Payloads.routes());
app.use(v3Rockets.routes());
app.use(v3Roadster.routes());
app.use(v3Ships.routes());

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
