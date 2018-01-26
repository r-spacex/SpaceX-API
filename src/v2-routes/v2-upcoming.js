// Upcoming Endpoints

const express = require('express');
const asyncHandle = require('express-async-handler');
const launch = require('../builders/launch-query');
const querySort = require('../builders/launch-sort');

const v2 = express.Router();

// Upcoming launches by date, year, or all
v2.get('/', asyncHandle(async (req, res) => {
  const query = launch.launchQuery(req);
  const sort = querySort.launchSort(req);
  const data = await global.db
    .collection('upcoming_v2')
    .find(query, { _id: 0 })
    .sort(sort)
    .toArray();
  res.json(data);
}));

module.exports = v2;
