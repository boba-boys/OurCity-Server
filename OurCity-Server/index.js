"use strict";

const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

// logging middleware
app.use(morgan("dev"));
// Cross-Origin Resourse Sharing middleware
app.use(cors());
// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static middleware
app.use(express.static(path.join(__dirname, "../App.js")));

// Hopefully this works
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use("/api", require("./api")); // include our routes!
app.use('/auth', require('./auth'))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../App.js"));
}); // Send index.html for any other requests

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error");
});

module.exports = app;
