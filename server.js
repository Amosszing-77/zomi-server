const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const { PORT, NODE_ENV } = require("./config/env");
const connectDB = require("./config/db");

const apiRoutes = require("./routes/index");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// ----- Global middleware -----
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (NODE_ENV === "development") app.use(morgan("dev"));

// ----- Static files (served PDFs) -----
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ----- Routes -----
app.use("/api", apiRoutes);

// ----- 404 + error -----
app.use(notFound);
app.use(errorHandler);

// ----- Boot -----
const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🌍 Environment: ${NODE_ENV}`);
  });
};

start();
