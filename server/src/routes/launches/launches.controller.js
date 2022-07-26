const { getAllLaunches } = require("../../models/launches.model");

function httpgGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

module.exports = {
  httpgGetAllLaunches,
};
