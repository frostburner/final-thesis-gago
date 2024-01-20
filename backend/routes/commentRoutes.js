const express = require("express");
const router = express.Router();
const { Comments, Posts } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/:PostId", async (req, res) => {
    const PostId = req.params.PostId;
    const comments = await Comments.findAll({ where: { PostId: PostId } });
    res.json(comments);
  });

router.post("/", validateToken, async (req, res) => {
    const comment = req.body;
    const username = req.user.username;
    comment.username = username;
    await Comments.create(comment);
    res.json(comment);
});


module.exports = router;
  