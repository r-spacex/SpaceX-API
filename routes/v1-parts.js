// Parts Endpoints

const express = require("express")
const v1 = express.Router()
const error = {error: "No results found"}

// Returns all capsule information
v1.get("/caps", (req, res) => {
  global.db.collection("capsule").find({},{"_id": 0}).sort({"capsule_serial": 1})
    .toArray((err, doc) => {
      if (err) return console.log(err)
      res.end(JSON.stringify(doc, null, 2))
    })
})

// Returns capsule info by serial #
v1.get("/caps/:cap", (req, res) => {
  const cap = req.params.cap
  global.db.collection("capsule").find({"capsule_serial": `${cap}`},{"_id": 0}).sort({"capsule_serial": 1})
    .toArray((err, doc) => {
      if (err) return console.log(err)
      if (doc.length == 0) {
        res.status(200).end(JSON.stringify(error, null, 2))
      }
      res.end(JSON.stringify(doc[0], null, 2))
    })
})

// Returns all core information
v1.get("/cores", (req, res) => {
  global.db.collection("core").find({},{"_id": 0}).sort({"core_serial": 1})
    .toArray((err, doc) => {
      if (err) return console.log(err)
      res.end(JSON.stringify(doc, null, 2))
    })
})

// Returns core info by serial #
v1.get("/cores/:core", (req, res) => {
  const core = req.params.core
  global.db.collection("core").find({"core_serial": `${core}`},{"_id": 0}).sort({"core_serial": 1})
    .toArray((err, doc) => {
      if (err) return console.log(err)
      if (doc.length == 0) {
        res.status(200).end(JSON.stringify(error, null, 2))
      }
      res.end(JSON.stringify(doc[0], null, 2))
    })
})

module.exports = v1
