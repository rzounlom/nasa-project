const http = require("http");
const mongoose = require("mongoose");

const app = require("./app");

const { loadPlenetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const MONGO_URL =
  "mongodb+srv://omp_admin:SecuritY2121808@cluster0.ky6cx.gcp.mongodb.net/nasa?retryWrites=true&w=majority";

const server = http.createServer(app);

// mongoose.connection.once("open", () => console.log("MongoDB connection ready"));

// mongoose.connection.on("error", (err) => console.error(err));

async function startServer() {
  await mongoose
    .connect(MONGO_URL)
    .then(console.log("db connected"))
    .catch((e) => console.error(e));
  await loadPlenetsData();

  server.listen(PORT, () => {
    console.log(`listening on PORT: ${PORT}`);
  });
}

startServer();
