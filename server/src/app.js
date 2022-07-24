const express = require("express");
const cors = require("cors");
const path = require("path");

const planetsRouter = require("./routes/planets/planets.router");

const app = express();

//parse json objects in request body
app.use(express.json());

//use cors middleware for cross-origin requests
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//use routers
app.use(planetsRouter);

//server frontend
app.use(express.static(path.join(__dirname, "..", "public")));

//set default index.html page to the root route when accessing the server
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
