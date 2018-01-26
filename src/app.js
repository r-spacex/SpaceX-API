
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const config = require('../config/config.json');
const MongoClient = require('mongodb');

const home = require('./v2-routes/v2-home');
const info = require('./v2-routes/v2-info');
const rockets = require('./v2-routes/v2-rockets');
const capsules = require('./v2-routes/v2-capsules');
const launchpad = require('./v2-routes/v2-launchpad');
const launches = require('./v2-routes/v2-launches');
const upcoming = require('./v2-routes/v2-upcoming');
const parts = require('./v2-routes/v2-parts');

const app = express();
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(morgan('common'));

// Global HTTP headers
app.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  res.header('Last-Modified', new Date().toUTCString());
  next();
});

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

// generic error handler - must have 4 parameters
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500);
  res.json({
    error: 'Internal Server Error',
  });
});

// Mongo Connection + Server Start
MongoClient.connect(config.url, (err, database) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  global.db = database;

  const port = process.env.PORT || 5000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`SpaceX API running on port: ${port}`);
    app.emit('ready');
  });
});

module.exports = app;
