const http = require("http");
const { mongoConnect } = require("./services/mongo.js");

const app = require("./app");

const { loadPlenetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

// mongoose.connection.once("open", () => console.log("MongoDB connection ready"));

// mongoose.connection.on("error", (err) => console.error(err));

async function startServer() {
  await mongoConnect();
  await loadPlenetsData();
  server.listen(PORT, () => {
    console.log(`listening on PORT: ${PORT}`);
  });
}

startServer();
