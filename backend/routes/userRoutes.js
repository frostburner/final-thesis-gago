const express = require("express");
const router = express.Router();
const { Users } = require("../models");

const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

// LOGIN VALIDATE IF USER EXISTS
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    // Use the correct syntax for findOne with where clause
    const user = await Users.findOne({ where: { username: username } });

    if (!user) {
      res.json({ error: "User does not exist!" });
      return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.json({ error: "Wrong username and password combination. Try again" });
      return;
    }

    const accessToken = sign(
      {
        username: user.username,
        id: user.id,
        role: user.role,
      },
      "secret"
    );

    res.json({
      token: accessToken,
      username: user.username,
      id: user.id,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while logging in!" });
  }
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

//POST OR REGISTER USER NADI HA GIN CHATGPT KO ANG CHECK IF USER EXIST KAY NATAMAD NAK O GINAGO
router.post("/", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const existingUser = await Users.findOne({ where: { username: username } });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists!" });
    }

    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        username: username,
        password: hash,
        role: role,
      });

      res.json("success");
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;