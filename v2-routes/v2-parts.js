// Parts Endpoints

const express = require("express")
const v2 = express.Router()
const cores = require("../builders/core-query")
const caps = require("../builders/capsule-query")
const error = {error: "No results found"}

// Returns all capsule information
v2.get("/caps", (req, res, next) => {
  let query = caps.capsuleQuery(req)
  global.db.collection("capsule").find(query,{"_id": 0}).sort({"capsule_serial": 1})
    .toArray((err, doc) => {
      if (err) {
        return next(err)
      }
      res.json(doc)
    })
})

// Returns capsule info by serial #
v2.get("/caps/:cap", (req, res, next) => {
  const cap = req.params.cap
  global.db.collection("capsule").find({"capsule_serial": `${cap}`},{"_id": 0}).sort({"capsule_serial": 1})
    .toArray((err, doc) => {
      if (err) {
        return next(err)
      }
      if (doc.length == 0) {
        res.status(404)
        return res.json(error)
      }
      res.json(doc[0])
    })
})

// Returns all core information
v2.get("/cores", (req, res, next) => {
  let query = cores.coreQuery(req)
  global.db.collection("core").find(query,{"_id": 0}).sort({"core_serial": 1})
    .toArray((err, doc) => {
      if (err) {
        return next(err)
      }
      res.json(doc)
    })
})

// Returns core info by serial #
v2.get("/cores/:core", (req, res, next) => {
  const core = req.params.core
  global.db.collection("core").find({"core_serial": `${core}`},{"_id": 0}).sort({"core_serial": 1})
    .toArray((err, doc) => {
      if (err) {
        return next(err)
      }
      if (doc.length == 0) {
        res.status(404)
        return res.json(error)
      }
      res.json(doc[0])
    })
})

module.exports = v2
