// Dragon Endpoints

const express = require("express")
const v2 = express.Router()

// Returns all capsule data
v2.get("/", (req, res, next) => {
  global.db.collection("dragon").find({},{"_id": 0 }).toArray((err, doc) => {
    if (err) {
      return next(err)
    }
    res.json(doc)
  })
})

// Returns Dragon 1 data
v2.get("/dragon1", (req, res, next) => {
  global.db.collection("dragon").find({"id": "dragon1"},{"_id": 0 }).toArray((err, doc) => {
    if (err) {
      return next(err)
    }
    res.json(doc[0])
  })
})

module.exports = v2
