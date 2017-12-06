
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const compression = require("compression")
const helmet = require("helmet")
const config = require("./config.json")
const MongoClient = require("mongodb")
const app = express()
const RateLimit = require("express-rate-limit")

const v2_home  = require("./v2-routes/v2-home")
const v2_info  = require("./v2-routes/v2-info")
const v2_rockets  = require("./v2-routes/v2-rockets")
const v2_capsules  = require("./v2-routes/v2-capsules")
const v2_launchpad  = require("./v2-routes/v2-launchpad")
const v2_launches  = require("./v2-routes/v2-launches")
const v2_upcoming  = require("./v2-routes/v2-upcoming")
const v2_parts  = require("./v2-routes/v2-parts")

// API rate limit of 10000 reqs / hour
const limiter = new RateLimit({
  windowMs: 2500 * 60 * 1000,
  max: 2500,
  delayMs: 0,
  message: "API rate limit reached"
})

app.use(compression())
app.use(helmet())
app.use(morgan("common"))
app.use(cors())
app.enable("trust proxy")
app.use(limiter)

// Global HTTP headers
app.use((req, res, next) => {
  res.header("Content-Type","application/json")
  res.header("Last-Modified", new Date().toUTCString())
  next()
})

app.use("/v2", v2_home)
app.use("/v2/info", v2_info)
app.use("/v2/rockets", v2_rockets)
app.use("/v2/capsules", v2_capsules)
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
