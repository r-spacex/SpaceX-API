// Vehicle Endpoints

const express = require("express")
const v1 = express.Router()

// Returns all vehicle info
v1.get("/", (req, res, next) => {
  global.db.collection("vehicle").find({},{"_id": 0 }).toArray((err, doc) => {
    if (err) return next(err)
    res.json(doc)
  })
})

// Returns Falcon 1 info
v1.get("/falcon1", (req, res, next) => {
  global.db.collection("vehicle").find({"id": "falcon1"},{"_id": 0 }).toArray((err, doc) => {
    if (err) return next(err)
    res.json(doc[0])
  })
})

// Returns Falcon 9 info
v1.get("/falcon9", (req, res, next) => {
  global.db.collection("vehicle").find({"id": "falcon9"},{"_id": 0 }).toArray((err, doc) => {
    if (err) return next(err)
    res.json(doc[0])
  })
})

// Returns Falcon Heavy info
v1.get("/falconheavy", (req, res, next) => {
  global.db.collection("vehicle").find({"id": "falcon_heavy"},{"_id": 0 }).toArray((err, doc) => {
    if (err) return next(err)
    res.json(doc[0])
  })
})

// Returns Dragon info
v1.get("/dragon", (req, res, next) => {
  global.db.collection("vehicle").find({"id": "dragon"},{"_id": 0 }).toArray((err, doc) => {
    if (err) return next(err)
    res.json(doc[0])
  })
})

module.exports = v1
