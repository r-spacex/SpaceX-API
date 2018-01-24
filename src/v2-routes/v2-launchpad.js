// Launchpad Endpoints

const express = require("express")
const v2 = express.Router()
const asyncHandle = require("express-async-handler")

// Return all launchpads
v2.get("/", asyncHandle(async (req, res) => {
  const data = await global.db
    .collection("launchpad")
    .find({},{"_id": 0 })
    .toArray()
  res.json(data)
}))

// Return specific launchpad
v2.get("/:pad", asyncHandle(async (req, res) => {
  const id = req.params.pad
  const data = await global.db
    .collection("launchpad")
    .find({"id": `${id}`}, {"_id": 0 })
    .toArray()
  res.json(data)
}))

module.exports = v2
