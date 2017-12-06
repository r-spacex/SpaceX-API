// Vehicle Endpoints

const express = require("express")
const v2 = express.Router()

// Returns all vehicle info
v2.get("/", (req, res, next) => {
  global.db.collection("vehicle").find({},{"_id": 0 }).toArray((err, doc) => {
    if (err) {
      return next(err)
    }
    res.json(doc)
  })
})

// Returns Falcon 1 info
v2.get("/falcon1", (req, res, next) => {
  global.db.collection("vehicle").find({"id": "falcon1"},{"_id": 0 }).toArray((err, doc) => {
    if (err) {
      return next(err)
    }
    res.json(doc[0])
  })
})

// Returns Falcon 9 info
v2.get("/falcon9", (req, res, next) => {
  global.db.collection("vehicle").find({"id": "falcon9"},{"_id": 0 }).toArray((err, doc) => {
    if (err) {
      return next(err)
    }
    res.json(doc[0])
  })
})

// Returns Falcon Heavy info
v2.get("/falconheavy", (req, res, next) => {
  global.db.collection("vehicle").find({"id": "falcon_heavy"},{"_id": 0 }).toArray((err, doc) => {
    if (err) {
      return next(err)
    }
    res.json(doc[0])
  })
})

module.exports = v2
