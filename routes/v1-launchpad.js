// Launchpad Endpoints

const express = require("express")
const v1 = express.Router()

// Get all launchpads
v1.get("/", (req, res) => {
  global.db.collection("launchpad").find({},{"_id": 0 }).toArray((err, doc) => {
    res.end(JSON.stringify(doc, null, 2))
  })
})

// Return all launchpads
v1.get("/:pad", (req, res) => {
  let id = req.params.pad
  global.db.collection("launchpad").find({"id": `${id}`}, {"_id": 0 }).toArray((err, doc) => {
    if (doc[0] === undefined) {
      res.end("No results found")
    }
    res.end(JSON.stringify(doc[0], null, 2))
  })
})

module.exports = v1
