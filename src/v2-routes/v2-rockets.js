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
  res.json(data)
}))

// // Returns Falcon 1 info
// v2.get("/falcon1", (req, res, next) => {
//   global.db.collection("rocket").find({"id": "falcon1"},{"_id": 0 }).toArray((err, doc) => {
//     if (err) {
//       return next(err)
//     }
//     res.json(doc[0])
//   })
// })

// // Returns Falcon 9 info
// v2.get("/falcon9", (req, res, next) => {
//   global.db.collection("rocket").find({"id": "falcon9"},{"_id": 0 }).toArray((err, doc) => {
//     if (err) {
//       return next(err)
//     }
//     res.json(doc[0])
//   })
// })

// // Returns Falcon Heavy info
// v2.get("/falconheavy", (req, res, next) => {
//   global.db.collection("rocket").find({"id": "falconheavy"},{"_id": 0 }).toArray((err, doc) => {
//     if (err) {
//       return next(err)
//     }
//     res.json(doc[0])
//   })
// })

module.exports = v2
