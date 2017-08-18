// Basic Info Endpoints

const express = require("express")
const v1 = express.Router()

// Returns company info
v1.get("/", (req, res) => {
  global.db.collection("info").find({},{"_id": 0 }).toArray((err, doc) => {
    if (err) return console.log(err)
    res.end(JSON.stringify(doc[0], null, 2))
  })
})

module.exports = v1
