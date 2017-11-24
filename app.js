
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const compression = require("compression")
const helmet = require("helmet")
const config = require("./config.json")
const MongoClient = require("mongodb")
const app = express()

const home  = require("./v1-routes/v1-home")
const info  = require("./v1-routes/v1-info")
const vehicles  = require("./v1-routes/v1-vehicles")
const launchpad  = require("./v1-routes/v1-launchpad")
const launches  = require("./v1-routes/v1-launches")
const upcoming  = require("./v1-routes/v1-upcoming")
const parts  = require("./v1-routes/v1-parts")

const v2_home  = require("./v2-routes/v2-home")
const v2_info  = require("./v2-routes/v2-info")
const v2_vehicles  = require("./v2-routes/v2-vehicles")
const v2_launchpad  = require("./v2-routes/v2-launchpad")
const v2_launches  = require("./v2-routes/v2-launches")
const v2_upcoming  = require("./v2-routes/v2-upcoming")
const v2_parts  = require("./v2-routes/v2-parts")

app.use(compression())
app.use(helmet())
app.use(morgan("common"))
app.use(cors())

// Global HTTP headers
app.use((req, res, next) => {
  res.header("Content-Type","application/json")
  res.header("Last-Modified",new Date().toUTCString())
  next()
})

app.use("/v1", home)
app.use("/v1/info", info)
app.use("/v1/vehicles", vehicles)
app.use("/v1/launchpads", launchpad)
app.use("/v1/launches", launches)
app.use("/v1/launches/upcoming", upcoming)
app.use("/v1/parts", parts)

app.use("/v2", v2_home)
app.use("/v2/info", v2_info)
app.use("/v2/vehicles", v2_vehicles)
app.use("/v2/launchpads", v2_launchpad)
app.use("/v2/launches", v2_launches)
app.use("/v2/launches/upcoming", v2_upcoming)
app.use("/v2/parts", v2_parts)

// 404 Error Handler
app.use((req, res) => {
  res.status(404)
  res.json({
    error: "No results found"
  })
})

// generic error handler - must have 4 parameters
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500)
  res.json({
    error: "Internal Server Error"
  })
})

// Mongo Connection + Server Start
MongoClient.connect(config.url, (err, database) => {
  if (err) {
    console.log(err)
    process.exit(1)
  }
  global.db = database
  
  app.set("port", (process.env.PORT || 5000))
  app.listen(app.get("port"), "0.0.0.0", () => {
    console.log("SpaceX API listening on port: " + app.get("port"))
    app.emit("ready")
  })
})

module.exports = app
