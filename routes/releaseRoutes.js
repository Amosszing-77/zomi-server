const express = require("express");
const router = express.Router();
const validateObjectId = require("../middleware/validateObjectId");
const {
  getReleases,
  createRelease,
  updateRelease,
  toggleReleaseStatus,
  deleteRelease,
} = require("../controllers/releaseController");

router.route("/").get(getReleases).post(createRelease);

router
  .route("/:id")
  .put(validateObjectId, updateRelease)
  .delete(validateObjectId, deleteRelease);

router.patch("/:id/status", validateObjectId, toggleReleaseStatus);

module.exports = router;
