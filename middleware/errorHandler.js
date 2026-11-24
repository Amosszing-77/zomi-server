const { NODE_ENV } = require("../config/env");

const errorHandler = (err, req, res, next) => {
  console.error("🔥 Error:", err.message);

  // Mongoose validation
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res
      .status(400)
      .json({ success: false, message: messages.join(", ") });
  }

  // Duplicate key (e.g. songNumber)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      message: `${field} already exists`,
    });
  }

  // Multer errors
  if (err.name === "MulterError") {
    return res.status(400).json({ success: false, message: err.message });
  }

  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Server Error",
    ...(NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
