// Basic Info Endpoints

const express = require("express")
const v2 = express.Router()

// Returns company info
v2.get("/", (req, res, next) => {
  global.db.collection("info").find({},{"_id": 0 }).toArray((err, doc) => {
    if (err) {
      return next(err)
    }
    res.json(doc[0])
  })
})

module.exports = v2
