// Launches Endpoints

const express = require('express');
const asyncHandle = require('express-async-handler');
const launch = require('../builders/launch-query');
const querySort = require('../builders/launch-sort');

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

// Return all past launches filtered by any querystring
v2.get('/', asyncHandle(async (req, res) => {
  const query = launch.launchQuery(req);
  const sort = querySort.launchSort(req);
  const data = await global.db
    .collection('launch_v2')
    .find(query, { _id: 0 })
    .sort(sort)
    .toArray();
  res.json(data);
}));

module.exports = v2;
