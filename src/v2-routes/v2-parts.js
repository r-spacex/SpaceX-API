// Parts Endpoints

const express = require('express');
const asyncHandle = require('express-async-handler');
const cores = require('../builders/core-query');
const caps = require('../builders/capsule-query');

const v2 = express.Router();

// Returns all capsule information
v2.get('/caps', asyncHandle(async (req, res) => {
  const data = await global.db
    .collection('capsule')
    .find(caps.capsuleQuery(req), { _id: 0 })
    .sort({ capsule_serial: 1 })
    .toArray();
  res.json(data);
}));

// Returns all core information
v2.get('/cores', asyncHandle(async (req, res) => {
  const data = await global.db
    .collection('core')
    .find(cores.coreQuery(req), { _id: 0 })
    .sort({ core_serial: 1 })
    .toArray();
  res.json(data);
}));

module.exports = v2;
