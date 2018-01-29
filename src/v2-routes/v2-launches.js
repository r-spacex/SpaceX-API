// Launches Endpoints

const express = require('express');
const asyncHandle = require('express-async-handler');
const launch = require('../builders/launch-query');
const sort = require('../builders/launch-sort');

const v2 = express.Router();

// Return most recent launch
v2.get('/latest', asyncHandle(async (req, res) => {
  const data = await global.db
    .collection('launch_v2')
    .find({}, { _id: 0 })
    .sort({ flight_number: -1 })
    .limit(1)
    .toArray();
  res.json(data[0]);
}));

// Return all past launches filtered by querystrings
v2.get('/', asyncHandle(async (req, res) => {
  const data = await global.db
    .collection('launch_v2')
    .find(launch.launchQuery(req), { _id: 0 })
    .sort(sort.launchSort(req))
    .toArray();
  res.json(data);
}));

module.exports = v2;
