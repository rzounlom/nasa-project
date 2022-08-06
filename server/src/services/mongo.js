const mongoose = require("mongoose");

require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

async function mongoConnect() {
  await mongoose
    .connect(MONGO_URL)
    .then(console.log("db connected"))
    .catch((e) => console.error(e));
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
