// Dragon Endpoints

const express = require("express")
const v2 = express.Router()
const asyncHandle = require("express-async-handler")

// Returns all Dragon data
v2.get("/", asyncHandle(async (req, res) => {
  const data = await global.db
    .collection("dragon")
    .find({},{"_id": 0 })
    .toArray()
  res.json(data)
}))

// Returns specific Dragon data
v2.get("/:capsule", asyncHandle(async (req, res) => {
  const capsule = req.params.capsule
  const data = global.db
    .collection("dragon")
    .find({"id": capsule},{"_id": 0 })
    .toArray()
  res.json(data[0])
}))

module.exports = v2
