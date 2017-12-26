// Launchpad Endpoints

const express = require("express")
const v2 = express.Router()
const error = {error: "No results found"}

// Get all launchpads
v2.get("/", (req, res) => {
  global.db.collection("launchpad").find({},{"_id": 0 }).toArray((err, doc) => {
    res.json(doc)
  })
})

// Return all launchpads
v2.get("/:pad", (req, res) => {
  const id = req.params.pad
  global.db.collection("launchpad").find({"id": `${id}`}, {"_id": 0 }).toArray((err, doc) => {
    if (doc.length == 0) {
      res.status(404)
      return res.json(error)
    }
    res.json(doc[0])
  })
})

module.exports = v2
