// Home Info Endpoint

const express = require("express")
const v1 = express.Router()

// Returns API Info
v1.get("/", (req, res) => {
  global.db.collection("home").find({},{"_id": 0 }).toArray((err, doc) => {
    if (err) return console.log(err)
    res.json(doc[0])
  })
})

module.exports = v1
