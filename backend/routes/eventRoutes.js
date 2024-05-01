const express = require("express");
const router = express.Router();
const { Events, Users } = require("../models");
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

// POST NEW EVENT
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, quantity, price, eventdate, UserId } = req.body;
    const image = req.file ? req.file.filename : "";

    const event = await Events.create({
      title: title,
      description: description,
      UserId: UserId,
      image: image,
      quantity: quantity,
      price: price,
      eventdate: eventdate,
    });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ALL THE EVENTS
router.get("/", async (req, res) => {
  try {
    const events = await Events.findAll({
      include: [{ model: Users, as: "eventuser" }],
    });

    res.status(200).json(events);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// GET EVENT BY ID
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const event = await Events.findByPk(id, {
      include: [{ model: Users, as: "eventuser" }],
    });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// DISPLAY ANG IYA NGA EVENTS KUNG SINO NAKA LOGIN
router.get("/viewBy/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const events = await Events.findAll({
      where: {
        UserId: userId,
      },
      include: [{ model: Users, as: "eventuser" }],
    });

    if (!events || events.length === 0) {
      return res
        .status(404)
        .json({ error: "No events found for the specified user" });
    }

    res.status(200).json(events);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// UPDATE EVENT
router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, quantity, price, eventdate } = req.body;
    const image = req.file ? req.file.filename : null;

    const updatedEvent = await Events.findByPk(id);
    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Update the fields
    updatedEvent.title = title;
    updatedEvent.description = description;
    updatedEvent.image = image;
    updatedEvent.quantity = quantity;
    updatedEvent.price = price;
    updatedEvent.eventdate = eventdate;
    if (image) {
      updatedEvent.image = image;
    }

    await updatedEvent.save();

    res.json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Error updating the event" });
  }
});

// DELETE BY ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const event = await Events.findByPk(id);

    if (event) {
      await event.destroy();
      res.status(204).send();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
