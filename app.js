
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const compression = require("compression")
const helmet = require("helmet")
const config = require("./config.json")
const MongoClient = require("mongodb")
const apicache = require("apicache")
const endpointError = {error: "No Endpoint Found"}
const app = express()
const cache = apicache.middleware

const home  = require("./routes/v1-home")
const info  = require("./routes/v1-info")
const vehicles  = require("./routes/v1-vehicles")
const launchpad  = require("./routes/v1-launchpad")
const launches  = require("./routes/v1-launches")
const upcoming  = require("./routes/v1-upcoming")
const parts  = require("./routes/v1-parts")

app.use(compression())
app.use(cache("1 hour"))
app.use(helmet())
app.use(morgan("common"))
app.use(cors())

// Global content type
app.use((req, res, next) => {
  res.header("Content-Type","application/json")
  next()
})

app.use("/v1", home)
app.use("/v1/info", info)
app.use("/v1/vehicles", vehicles)
app.use("/v1/launchpads", launchpad)
app.use("/v1/launches", launches)
app.use("/v1/launches/upcoming", upcoming)
app.use("/v1/parts", parts)

// 404 Error Handler
app.use((req, res) => {
  res.status(404).end(JSON.stringify(endpointError, null, 2))
})

// Mongo Connection + Server Start
MongoClient.connect(config.url, (err, database) => {
  if (err) return console.log(err)
  global.db = database
  
  app.set("port", (process.env.PORT || 5000))
  app.listen(app.get("port"), "0.0.0.0", () => {
    console.log("SpaceX API listening on port: " + app.get("port"))
    app.emit("ready")
  })
})

module.exports = app
