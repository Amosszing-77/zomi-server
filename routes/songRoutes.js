const express = require("express");
const router = express.Router();
const validateObjectId = require("../middleware/validateObjectId");
const {
  getSongs,
  createSong,
  toggleSongStatus,
  deleteSong,
} = require("../controllers/songController");

router.route("/").get(getSongs).post(createSong); // <-- No more Multer here

router.route("/:id").delete(validateObjectId, deleteSong);

router.patch("/:id/status", validateObjectId, toggleSongStatus);

module.exports = router;
