const express = require("express");
const router = express.Router();
const { Media, Users } = require("../models");
// IMPORTS PARA MAG UPLOADER IMAGE
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadFolder = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder);
    }
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// POST NEW MEDIA
router.post("/", upload.single("media"), async (req, res) => {
  try {
    const media = req.file ? req.file.filename : "";

    const file = await Media.create({
      media: media,
    });
    res.json(file);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ALL THE MEDIA
router.get("/", async (req, res) => {
  try {
    const files = await Media.findAll({
      include: [{ model: Users, as: "mediaUser" }],
    });

    res.status(200).json(files);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
