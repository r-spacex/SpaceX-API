// API Info Endpoint

const express = require('express');
const asyncHandle = require('express-async-handler');

const v2 = express.Router();

// Returns API info
v2.get('/', asyncHandle(async (req, res) => {
  const data = await global.db
    .collection('home')
    .find({})
    .project({ _id: 0 })
    .toArray();
  res.json(data[0]);
}));

module.exports = v2;
