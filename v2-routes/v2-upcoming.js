// Upcoming Endpoints

const express = require("express")
const v2 = express.Router()

// Upcoming launches by date, year, or all
v2.get("/", (req, res, next) => {
  const year = req.query.year
  const start = req.query.start
  const final = req.query.final
  if (year) {
    global.db.collection("upcoming").find({"launch_year": `${year}`}, {"_id": 0 }).sort({"flight_number": -1})
      .toArray((err, doc) => {
        res.json(doc)
      })
  } else if (start && final) {
    global.db.collection("upcoming").find({ "launch_date_utc": {"$gte": `${start}T00:00:00Z`, "$lte": `${final}T00:00:00Z`}}, {"_id": 0 })
      .sort({"flight_number": 1})
      .toArray((err, doc) => {
        res.json(doc)
      })
  } else {
    global.db.collection("upcoming").find({},{"_id": 0 }).sort({"flight_number": 1})
      .toArray((err, doc) => {
        if (err) {
          return next(err)
        }
        res.json(doc)
      })
  }
})

module.exports = v2
