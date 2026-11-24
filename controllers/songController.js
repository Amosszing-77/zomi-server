const Song = require("../models/Song");
const asyncHandler = require("../utils/asyncHandler");

// @desc    Get all songs
const getSongs = asyncHandler(async (req, res) => {
  const { category, status, search } = req.query;
  const filter = {};

  if (category && category !== "All") filter.category = category;
  if (status) filter.status = status;
  if (search) {
    const rx = new RegExp(search.trim(), "i");
    filter.$or = [{ title: rx }, { songNumber: rx }];
  }

  const songs = await Song.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, count: songs.length, data: songs });
});

// @desc    Create song
const createSong = asyncHandler(async (req, res) => {
  const { title, songNumber, category, driveLink } = req.body;

  const song = await Song.create({
    title,
    songNumber,
    category,
    driveLink,
  });

  res.status(201).json({ success: true, data: song });
});

// @desc    Toggle status
const toggleSongStatus = asyncHandler(async (req, res) => {
  const song = await Song.findById(req.params.id);
  if (!song) {
    res.status(404);
    throw new Error("Song not found");
  }
  song.status = song.status === "Published" ? "Draft" : "Published";
  await song.save();
  res.json({ success: true, data: song });
});

// @desc    Delete song
const deleteSong = asyncHandler(async (req, res) => {
  const song = await Song.findById(req.params.id);
  if (!song) {
    res.status(404);
    throw new Error("Song not found");
  }
  await song.deleteOne();
  res.json({ success: true, message: "Song deleted" });
});

module.exports = { getSongs, createSong, toggleSongStatus, deleteSong };
