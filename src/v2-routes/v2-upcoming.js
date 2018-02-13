// Upcoming Endpoints

const express = require('express');
const asyncHandle = require('express-async-handler');
const { fetchLaunch } = require('../helpers/launch-database');

const v2 = express.Router();

// Return upcoming launches filtered by querystrings
v2.get('/', asyncHandle(async (req, res) => {
  const data = await fetchLaunch('upcoming_v2', req);
  res.json(data);
}));

module.exports = v2;
