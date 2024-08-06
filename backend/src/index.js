const express = require("express");
const cors = require("cors");
const {
  PORT,
  CLOUD_NAME,
  API_KEY,
  API_SECRET,
  ORIGIN,
} = require("./config/index.js");
const connectDB = require("./config/db.js");
const postRoute = require("./routes/postRoute.js");
const cloudinary = require("cloudinary");
const { startKafka, stopKafka } = require("./kafka/index.js");
const app = express();

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

app.use(cors({ origin: ORIGIN }));
app.use(express.json({ extended: true, limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", postRoute);

let server;

async function startServer() {
  try {
    await connectDB();
    await startKafka();
    server = app.listen(PORT, () => {
      console.log(`Running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

async function gracefulShutdown() {
  console.log("Graceful shutdown initiated");

  if (server) {
    await stopKafka();
    server.close(async (err) => {
      if (err) {
        console.error("Error closing HTTP server:", err);
        process.exit(1);
      }
      console.log("HTTP server closed");
      process.exit(0);
    });
  }
}

const signals = ["SIGINT", "SIGTERM", "SIGQUIT"];
signals.forEach((signal) => {
  process.on(signal, () => {
    console.log(`Received ${signal}, starting graceful shutdown...`);
    gracefulShutdown();
  });
});

startServer();
