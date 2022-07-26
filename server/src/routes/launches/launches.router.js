const express = require("express");

const { httpgGetAllLaunches } = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/launches", httpgGetAllLaunches);

module.exports = launchesRouter;
