// Parts Endpoints

const express = require("express")
const v2 = express.Router()
const cores = require("../builders/core-query")
const caps = require("../builders/capsule-query")

// Returns all capsule information
v2.get("/caps", (req, res, next) => {
  const query = caps.capsuleQuery(req)
  global.db.collection("capsule").find(query,{"_id": 0}).sort({"capsule_serial": 1})
    .toArray((err, doc) => {
      if (err) {
        return next(err)
      }
      res.json(doc)
    })
})

// Returns all core information
v2.get("/cores", (req, res, next) => {
  const query = cores.coreQuery(req)
  global.db.collection("core").find(query,{"_id": 0}).sort({"core_serial": 1})
    .toArray((err, doc) => {
      if (err) {
        return next(err)
      }
      res.json(doc)
    })
})

module.exports = v2
