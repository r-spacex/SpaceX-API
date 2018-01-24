// API Info Endpoint

const express = require("express")
const v2 = express.Router()
const asyncHandle = require("express-async-handler")

// Returns API info
v2.get("/", asyncHandle(async (req, res) => {
  const data = await global.db
    .collection("home")
    .find({},{"_id": 0 })
    .toArray()
  res.json(data[0])
}))

module.exports = v2
