// Launches Endpoints

const express = require('express');
const asyncHandle = require('express-async-handler');
const project = require('../builders/project-query');
const { fetchLaunch } = require('../helpers/launch-database');

const cache = require('express-redis-cache')({
  client: global.client,
  expire: 5000,
});

const v2 = express.Router();

// Return most recent launch
v2.get('/latest', cache.route(), asyncHandle(async (req, res) => {
  const data = await global.db
    .collection('launch_v2')
    .find({})
    .project(project.queryProject(req))
    .sort({ flight_number: -1 })
    .limit(1)
    .toArray();
  res.json(data[0]);
}));

// Return all past launches filtered by querystrings
v2.get('/', cache.route(), asyncHandle(async (req, res) => {
  const data = await fetchLaunch('launch_v2', req);
  res.json(data);
}));

v2.get('/all', cache.route(), asyncHandle(async (req, res) => {
  const pastData = await fetchLaunch('launch_v2', req);
  const upcomingData = await fetchLaunch('upcoming_v2', req);
  const data = pastData.concat(upcomingData);

  res.json(data);
}));

module.exports = v2;
