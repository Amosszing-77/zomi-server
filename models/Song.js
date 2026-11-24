const mongoose = require("mongoose");

const CATEGORIES = ["8th Edition", "9th Edition"];

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    songNumber: {
      type: String,
      required: [true, "Song number is required"],
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: { values: CATEGORIES, message: "Invalid category" },
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
      enum: ["Draft", "Published"],
      default: "Draft",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Song", songSchema);
