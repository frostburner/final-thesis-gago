const express = require("express");
const router = express.Router();
const { Posts, Users } = require("../models");

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

// Define allowed file types using a mime type array
const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "video/mp4"];

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Check if file mime type is in the allowed list
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only images (JPEG, JPG, PNG) and videos (MP4) are allowed."
        )
      );
    }
  },
});

// GET ALL THE POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.findAll({
      include: [{ model: Users, as: "postuser" }],
    });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// NEW POST
router.post("/", upload.single("media"), async (req, res) => {
  try {
    const media = req.file ? req.file.filename : "";
    if (req.file) {
      const { message, UserId } = req.body;
      const post = await Posts.create({
        message: message,
        media: media,
        UserId: UserId,
      });
      res.json(post);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET POST BY ID
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Posts.findByPk(id, {
      include: [{ model: Users, as: "postuser" }],
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
