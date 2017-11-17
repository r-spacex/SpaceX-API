// Launches Endpoints

const express = require("express")
const v1 = express.Router()
const error = {error: "No results found"}

// Get most recent launch
v1.get("/latest", (req, res, next) => {
  global.db.collection("launch").find({},{"_id": 0 }).sort({"flight_number": -1}).limit(1)
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

// All launches by date, year, or default to all launches
v1.get("/", (req, res, next) => {
  const year = req.query.year
  const start = req.query.start
  const final = req.query.final
  const site = req.query.site
  if (year) {
    global.db.collection("launch").find({"launch_year": `${year}`}, {"_id": 0 }).sort({"flight_number": -1})
      .toArray((err, doc) => {
        res.json(doc)
      })
  } else if (start && final) {
    global.db.collection("launch").find({ "launch_date_utc": {"$gte": `${start}T00:00:00Z`, "$lte": `${final}T00:00:00Z`}}, {"_id": 0 })
      .sort({"flight_number": 1})
      .toArray((err, doc) => {
        res.json(doc)
      })
  } else if (site) {
    global.db.collection("launch").find({ "launch_site.site_id": `${site}`}, {"_id": 0 })
      .sort({"flight_number": 1})
      .toArray((err, doc) => {
        res.json(doc)
      })
  } else {
    global.db.collection("launch").find({},{"_id": 0 }).sort({"flight_number": 1})
      .toArray((err, doc) => {
        if (err) {
          return next(err)
        }
        res.json(doc)
      })
  }
})

// Returns launches by core serial #
v1.get("/cores/:core", (req, res, next) => {
  const core = req.params.core
  const year = req.query.year
  const start = req.query.start
  const final = req.query.final
  const site = req.query.site
  if (year && core) {
    global.db.collection("launch").find({"core_serial": `${core}`, "launch_year": `${year}`}, {"_id": 0 }).sort({"flight_number": -1})
      .toArray((err, doc) => {
        res.json(doc)
      })
  } else if (start && final && core) {
    global.db.collection("launch").find({ "core_serial": `${core}`, "launch_date_utc": {"$gte": `${start}T00:00:00Z`, "$lte": `${final}T00:00:00Z`}}, {"_id": 0 })
      .sort({"flight_number": 1})
      .toArray((err, doc) => {
        res.json(doc)
      })
  } else if (site && core) {
    global.db.collection("launch").find({ "core_serial": `${core}`, "launch_site.site_id": `${site}`}, {"_id": 0 })
      .sort({"flight_number": 1})
      .toArray((err, doc) => {
        res.json(doc)
      })
  } else if (core) {
    global.db.collection("launch").find({"core_serial": `${core}`},{"_id": 0}).sort({"core_serial": 1})
      .toArray((err, doc) => {
        if (err) {
          return next(err)
        }
        res.json(doc)
      })
  }
})

// Returns launches by capsule serial #
v1.get("/caps/:cap", (req, res, next) => {
  const cap = req.params.cap
  const year = req.query.year
  const start = req.query.start
  const final = req.query.final
  const site = req.query.site
  if (year && cap) {
    global.db.collection("launch").find({"cap_serial": `${cap}`, "launch_year": `${year}`}, {"_id": 0 }).sort({"flight_number": -1})
      .toArray((err, doc) => {
        res.json(doc)
      })
  } else if (start && final && cap) {
    global.db.collection("launch").find({ "cap_serial": `${cap}`, "launch_date_utc": {"$gte": `${start}T00:00:00Z`, "$lte": `${final}T00:00:00Z`}}, {"_id": 0 })
      .sort({"flight_number": 1})
      .toArray((err, doc) => {
        res.json(doc)
      })
  } else if (site && cap) {
    global.db.collection("launch").find({ "cap_serial": `${cap}`, "launch_site.site_id": `${site}`}, {"_id": 0 })
      .sort({"flight_number": 1})
      .toArray((err, doc) => {
        res.json(doc)
      })
  } else {
    global.db.collection("launch").find({"cap_serial": `${cap}`},{"_id": 0}).sort({"capsule_serial": 1})
      .toArray((err, doc) => {
        if (err) {
          return next(err)
        }
        res.json(doc)
      })
  }
})

// Returns all ASDS launches
v1.get("/asds", (req, res, next) => {
  global.db.collection("launch").find({"landing_type": "ASDS"},{"_id": 0}).sort({"flight_number": 1})
    .toArray((err, doc) => {
      if (err) {
        return next(err)
      }
      res.json(doc)
    })
})

// Returns all RTLS launches
v1.get("/rtls", (req, res, next) => {
  global.db.collection("launch").find({"landing_type": "RTLS"},{"_id": 0}).sort({"flight_number": 1})
    .toArray((err, doc) => {
      if (err) {
        return next(err)
      }
      res.json(doc)
    })
})

module.exports = v1
