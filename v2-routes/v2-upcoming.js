// Upcoming Endpoints

const express = require("express")
const v2 = express.Router()
const launch = require("../utilities/launch-query")

// Upcoming launches by date, year, or all
v2.get("/", (req, res, next) => {
  let query = launch.launchQuery(req)
  global.db.collection("upcoming").find(query,{"_id": 0 }).sort({"flight_number": 1})
    .toArray((err, doc) => {
      if (err) {
        return next(err)
      }
      res.json(doc)
    })
})

module.exports = v2
