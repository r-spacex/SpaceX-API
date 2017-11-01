// Basic Info Endpoints

const express = require("express")
const v1 = express.Router()

// Returns company info
v1.get("/", (req, res) => {
  global.db.collection("info").find({},{"_id": 0 }).toArray((err, doc) => {
    if (err) return console.log(err)
    res.json(doc[0])
  })
})

module.exports = v1
