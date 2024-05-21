const express = require("express");
const router = express.Router();
const { Users } = require("../models");

const multer = require("multer");
const path = require("path");
const fs = require("fs");

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



const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

// get all users
router.get("/", async (req, res) => {
  const listofUsers = await Users.findAll();
  res.json(listofUsers);
});

// get a specific user
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const user = await Users.findByPk(id);
  res.json(user);
});

// edit a user
router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const { username, password, role } = req.body;

  try {
    const user = await Users.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    user.username = username;
    user.role = role;

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    await user.save();
    res.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete a user
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Users.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    await user.destroy();
    res.json(user);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

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

// router.get("/auth", validateToken, (req, res) => {
//   res.json(req.user);
// });

//POST OR REGISTER USER NADI HA GIN CHATGPT KO ANG CHECK IF USER EXIST KAY NATAMAD NAK O GINAGO
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, birthday, email, address, username, password, role } = req.body;
    const existingUser = await Users.findOne({ where: { username: username } });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.create({
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: hashedPassword,
      birthday: birthday,
      email: email,
      address: address,
      role: role,
    });

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

//edit na ni nga may profile tangina
router.put("/edit/:id", upload.single("image"), async (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, username, password, birthday, email, address } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const updatedProfile = await Users.findByPk(id);

    if (!updatedProfile) {
      return res.status(404).json({error: "User not found."});
    }

    updatedProfile.firstName = firstName;
    updatedProfile.lastName = lastName;
    updatedProfile.username = username;
    // updatedProfile.password = password;
    updatedProfile.birthday  = birthday;
    updatedProfile.email = email;
    updatedProfile.address = address;
    if (image) {
      updatedProfile.image = image;
    }

    await updatedProfile.save();
    res.json(updatedProfile);
  }catch (error) {
    console.error("Error updating profile", error);
    res.status(500).json({error: "Internal service error"});
  }

});

//USER SEARCH POTAKA
router.get("/search", async (req, res) => {
  try {
    const query = req.query.query.toLowerCase();
    
    // Search for users, posts, groups, etc. in the database based on the query
    const userResults = await Users.findAll({
      where: {
        [Sequelize.Op.or]: [
          { username: { [Sequelize.Op.iLike]: `%${query}%` } },
          { firstName: { [Sequelize.Op.iLike]: `%${query}%` } },
          { lastName: { [Sequelize.Op.iLike]: `%${query}%` } }
        ]
      }
    });

    res.json(searchResults);
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
