
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const pretty = require('express-prettify');
const MongoClient = require('mongodb');
const cache = require('./db/redis');

const home = require('./v2-routes/v2-home');
const info = require('./v2-routes/v2-info');
const rockets = require('./v2-routes/v2-rockets');
const capsules = require('./v2-routes/v2-capsules');
const launchpad = require('./v2-routes/v2-launchpad');
const launches = require('./v2-routes/v2-launches');
const upcoming = require('./v2-routes/v2-upcoming');
const parts = require('./v2-routes/v2-parts');

// Production read-only DB
const url = 'mongodb+srv://public:spacex@spacex-api-rzdz4.mongodb.net/spacex-api';

const app = express();

// Gzip all responses
app.use(compression());

// HTTP header security
app.use(helmet());

// Enable CORS for all routes
app.use(cors());

// Add pretty output option for debugging
app.use(pretty({ query: 'pretty' }));

// Hide logging when running tests
// Disable Redis caching when running tests
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('common'));
  app.use(cache.route());
}

// Global HTTP headers
app.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  res.header('Last-Modified', new Date().toUTCString());
  next();
});

// Express Router routes
app.use('/v2', home);
app.use('/v2/info', info);
app.use('/v2/rockets', rockets);
app.use('/v2/capsules', capsules);
app.use('/v2/launchpads', launchpad);
app.use('/v2/launches', launches);
app.use('/v2/launches/upcoming', upcoming);
app.use('/v2/parts', parts);

// 404 Error Handler
app.use((req, res) => {
  res.status(404);
  res.json({
    error: 'No results found',
  });
});

// 500 error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500);
  res.json({
    error: 'Internal Server Error',
  });
});

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

module.exports = app;
