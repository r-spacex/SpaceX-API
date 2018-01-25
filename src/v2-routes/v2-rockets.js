// Rocket Endpoints

const express = require("express")
const v2 = express.Router()
const asyncHandle = require("express-async-handler")

// Returns all rocket info
v2.get("/", asyncHandle(async (req, res) => {
  const data = await global.db
    .collection("rocket")
    .find({},{"_id": 0 })
    .toArray()
  res.json(data)
}))

// Returns specific rocket info
v2.get("/:rocket", asyncHandle(async (req, res) => {
  const rocket = req.params.rocket
  const data = await global.db
    .collection("rocket")
    .find({"id": `${rocket}`},{"_id": 0 })
    .toArray()
  res.json(data[0])
}))

module.exports = v2
