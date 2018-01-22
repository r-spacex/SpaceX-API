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

// Returns Dragon data
v2.get("/:capsule", (req, res, next) => {
  const capsule = req.params.capsule
  global.db.collection("dragon").find({"id": capsule},{"_id": 0 }).toArray((err, doc) => {
    if (err) {
      return next(err)
    }
    res.json(doc)
  })
})

module.exports = v2
