// Launches Endpoints

const express = require("express")
const v2 = express.Router()
const launch = require("../utilities/launch-query")

// Get most recent launch
v2.get("/latest", (req, res, next) => {
  global.db.collection("launch").find({},{"_id": 0 }).sort({"flight_number": -1}).limit(1)
    .toArray((err, doc) => {
      if (err) {
        return next(err)
      }
      res.json(doc[0])
    })
})

// All past launches filtered by any querystring
v2.get("/", (req, res, next) => {
  let query = launch.launchQuery(req)
  global.db.collection("launch").find(query,{"_id": 0 }).sort({"flight_number": 1})
    .toArray((err, doc) => {
      if (err) {
        return next(err)
      }
      res.json(doc)
    })
})

module.exports = v2
