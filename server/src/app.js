const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const planetsRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");

const app = express();

//parse json objects in request body
app.use(express.json());

//use cors middleware for cross-origin requests
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//use morgan middleware for logging
app.use(morgan("combined"));

//use routers
app.use(planetsRouter);
app.use(launchesRouter);

//server frontend
app.use(express.static(path.join(__dirname, "..", "public")));

//set default index.html page to the root route when accessing the server
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
