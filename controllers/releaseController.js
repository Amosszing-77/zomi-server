const Release = require("../models/Release");
const asyncHandler = require("../utils/asyncHandler");

// @desc    Get all releases (optional filters: platform, status)
// @route   GET /api/releases
const getReleases = asyncHandler(async (req, res) => {
  const { platform, status } = req.query;
  const filter = {};
  if (platform) filter.platform = platform;
  if (status) filter.status = status;

  const releases = await Release.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, count: releases.length, data: releases });
});

// @desc    Create release
// @route   POST /api/releases
const createRelease = asyncHandler(async (req, res) => {
  const { platform, version, build, notes, driveLink } = req.body;

  const release = await Release.create({
    platform,
    version,
    build,
    notes,
    driveLink,
  });
  res.status(201).json({ success: true, data: release });
});

// @desc    Update release (version bump, new link, etc.)
// @route   PUT /api/releases/:id
const updateRelease = asyncHandler(async (req, res) => {
  const { platform, version, build, notes, driveLink } = req.body;

  const release = await Release.findById(req.params.id);
  if (!release) {
    res.status(404);
    throw new Error("Release not found");
  }

  release.platform = platform ?? release.platform;
  release.version = version ?? release.version;
  release.build = build ?? release.build;
  release.notes = notes ?? release.notes;
  release.driveLink = driveLink ?? release.driveLink;

  const updated = await release.save();
  res.json({ success: true, data: updated });
});

// @desc    Toggle release status
// @route   PATCH /api/releases/:id/status
const toggleReleaseStatus = asyncHandler(async (req, res) => {
  const release = await Release.findById(req.params.id);
  if (!release) {
    res.status(404);
    throw new Error("Release not found");
  }
  release.status = release.status === "Published" ? "Draft" : "Published";
  await release.save();
  res.json({ success: true, data: release });
});

// @desc    Delete release
// @route   DELETE /api/releases/:id
const deleteRelease = asyncHandler(async (req, res) => {
  const release = await Release.findById(req.params.id);
  if (!release) {
    res.status(404);
    throw new Error("Release not found");
  }
  await release.deleteOne();
  res.json({ success: true, message: "Release deleted" });
});

module.exports = {
  getReleases,
  createRelease,
  updateRelease,
  toggleReleaseStatus,
  deleteRelease,
};
