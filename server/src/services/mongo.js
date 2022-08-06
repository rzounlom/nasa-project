const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://omp_admin:SecuritY2121808@cluster0.ky6cx.gcp.mongodb.net/nasa?retryWrites=true&w=majority";

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
