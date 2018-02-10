// Launchpad Endpoints

const express = require('express');
const asyncHandle = require('express-async-handler');

const v2 = express.Router();

// Return all launchpads
v2.get('/', asyncHandle(async (req, res) => {
  const data = await global.db
    .collection('launchpad')
    .find({})
    .project({ _id: 0 })
    .toArray();
  res.json(data);
}));

// Return specific launchpad
v2.get('/:pad', asyncHandle(async (req, res) => {
  const data = await global.db
    .collection('launchpad')
    .find({ id: req.params.pad })
    .project({ _id: 0 })
    .toArray();
  res.json(data[0]);
}));

module.exports = v2;
