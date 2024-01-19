const express = require("express");
const router = express.Router();
const { Products, Users } = require("../models");
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

// UPLOAD PRODUCTS RAWR LODS AH
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, description, quantity, price, UserId } = req.body;
    const image = req.file ? req.file.filename : "";

    const products = await Products.create({
      name: name,
      description: description,
      quantity: quantity,
      price: price,
      UserId: UserId,
      image: image,
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DISPLAY FOR STORE
router.get("/", async (req, res) => {
  try {
    const products = await Products.findAll({
      include: [{ model: Users, as: "user" }],
    });

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// DISPLAY SPECIFIC DETAILS OF PRODUCT
router.get("/view/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Products.findByPk(id, {
      include: [{ model: Users, as: "user" }],
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// DISPLAY ANG PRODUCTS KUNG SINO NAKA LOGIN
router.get("/viewBy/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const products = await Products.findAll({
      where: {
        UserId: userId,
      },
      include: [{ model: Users, as: "user" }],
    });

    if (!products || products.length === 0) {
      return res.status(404).json({ error: "No products found for the specified user" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// UPDATING OF PRODUCTS WITHOUT UPDATING THE IMAGE
router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const { name, description, quantity, price} = req.body;

  try {
      const product = await Products.findByPk(id);

      if (!product) {
          return res.status(404).json({ error: "product not found."});
      }
      product.name = name;
      product.description = description;
      product.quantity = quantity;
      product.price = price;

      await product.save();
      res.json(product);
  } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Internal server error"});
  }
});

// DELETE BY ID sheesh escodero
router.delete('/:id', async(req,res)=>{
  const id = req.params.id;

  try{
      const product = await Products.findByPk(id);

      if(product){
          await product.destroy();
          res.status(204).send();
      }
  }catch(error){
      console.log(error);
      res.status(500).json({error: error.message});
  }
})

module.exports = router;