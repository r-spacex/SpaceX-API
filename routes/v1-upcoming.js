// Upcoming Endpoints

const express = require("express")
const v1 = express.Router()
const error = {error: "No results found"}

// Upcoming launches by date, year, or all
v1.get("/", (req, res) => {
  const year = req.query.year
  const start = req.query.start
  const final = req.query.final
  if (year) {
    global.db.collection("upcoming").find({"launch_year": `${year}`}, {"_id": 0 }).sort({"flight_number": -1})
      .toArray((err, doc) => {
        if (doc.length == 0) {
          res.status(200).end(JSON.stringify(error, null, 2))
        }
        res.end(JSON.stringify(doc, null, 2))
      })
  } else if (start && final) {
    global.db.collection("upcoming").find({ "launch_date_utc": {"$gte": `${start}T00:00:00Z`, "$lte": `${final}T00:00:00Z`}}, {"_id": 0 })
      .sort({"flight_number": 1})
      .toArray((err, doc) => {
        if (doc.length == 0) {
          res.status(200).end(JSON.stringify(error, null, 2))
        }
        res.end(JSON.stringify(doc, null, 2))
      })
  } else {
    global.db.collection("upcoming").find({},{"_id": 0 }).sort({"flight_number": 1})
      .toArray((err, doc) => {
        if (err) return console.log(err)
        res.end(JSON.stringify(doc, null, 2))
      })
  }
})

module.exports = v1
