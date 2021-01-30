
const conditional = require('koa-conditional-get');
const etag = require('koa-etag');
const cors = require('koa2-cors');
const helmet = require('koa-helmet');
const Koa = require('koa');
const logger = require('koa-morgan');
const mask = require('koa-json-mask');
const mongoose = require('mongoose');
const json = require('./middleware/json');
const responseTime = require('./middleware/response-time');
const deprecated = require('./middleware/deprecated');
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

const app = new Koa();

// Production read-only DB
const URL = process.env.MONGO_URL || 'mongodb+srv://public:spacex@spacex-gcp-gpg0u.gcp.mongodb.net/spacex-api';

// Mongo connection
mongoose.connect(URL, {
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

// HTTP requests logger
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('[:date[clf]] ":method :url HTTP/:http-version" :status - :response-time ms'));
}

// Error Handler
app.use(errorHandler());

app.use(conditional());

app.use(etag());

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

// Add deprecation headers
app.use(deprecated());

// Allow pretty print via pretty=true querystring
// Pretty printed json will NOT be cached
app.use(json({ pretty: false, param: { pretty: true } }));

// Allow user to restrict the keys returned
app.use(mask({
  name: 'filter',
}));

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
