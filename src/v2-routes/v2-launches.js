// Launches Endpoints

const express = require('express');
const asyncHandle = require('express-async-handler');
const { fetchLaunch } = require('../helpers/launch-database');

const v2 = express.Router();

// Return most recent launch
v2.get('/latest', asyncHandle(async (req, res) => {
  const data = await global.db
    .collection('launch_v2')
    .find({})
    .project({ _id: 0 })
    .sort({ flight_number: -1 })
    .limit(1)
    .toArray();
  res.json(data[0]);
}));

// Return all past launches filtered by querystrings
v2.get('/', asyncHandle(async (req, res) => {
  const data = await fetchLaunch('launch_v2', req);
  res.json(data);
}));

v2.get('/info', asyncHandle(async (req, res) => {
  const pastData = await fetchLaunch('launch_v2', req);
  const upcomingData = await fetchLaunch('upcoming_v2', req);
  const data = pastData.concat(upcomingData);

  res.json(data);
}));

module.exports = v2;
