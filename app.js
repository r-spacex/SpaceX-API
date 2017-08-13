
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const compression = require("compression")
const helmet = require("helmet")
const config = require("./config.json")
const MongoClient = require("mongodb")
const Path = require("path")
const app = express()

// Define routes
const home  = require("./routes/v1-home")
const info  = require("./routes/v1-info")
const vehicles  = require("./routes/v1-vehicles")
const launchpad  = require("./routes/v1-launchpad")
const launches  = require("./routes/v1-launches")
const upcoming  = require("./routes/v1-upcoming")
const parts  = require("./routes/v1-parts")

// Enable gzip helmet,
// HTTP logging, and CORS
app.use(compression())
app.use(helmet())
app.use(morgan("common"))
app.use(cors())

// Routes
app.use("/v1", home)
app.use("/v1/info", info)
app.use("/v1/vehicles", vehicles)
app.use("/v1/launchpads", launchpad)
app.use("/v1/launches", launches)
app.use("/v1/launches/upcoming", upcoming)
app.use("/v1/parts", parts)

// 404 Error Handler
app.use((req, res) => {
  res.status(404).sendFile(Path.join(__dirname + "/pages/404.html"))
})

// Create MongoDB Connection
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
