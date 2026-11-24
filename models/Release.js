const mongoose = require("mongoose");

const PLATFORMS = ["Android", "iOS"];
const STATUSES = ["Draft", "Published"];

const releaseSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: [true, "Platform is required"],
      enum: { values: PLATFORMS, message: "Invalid platform" },
    },
    version: {
      type: String,
      required: [true, "Version is required"],
      trim: true,
    },
    build: {
      type: String,
      trim: true,
      default: "",
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
    driveLink: {
      type: String,
      required: [true, "Google Drive link is required"],
      trim: true,
      validate: {
        validator: (v) => /^https?:\/\//i.test(v),
        message: "Drive link must be a valid URL",
      },
    },
    status: {
      type: String,
      enum: STATUSES,
      default: "Draft",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Release", releaseSchema);
module.exports.PLATFORMS = PLATFORMS;
module.exports.STATUSES = STATUSES;
