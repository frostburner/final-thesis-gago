const express = require("express");
const router = express.Router();
const { Checkouts, Users, Products } = require("../models");

const sequelize = require('../models').sequelize;

// STORE CHECKOUT RARWR
router.post("/", async (req, res) => {
  const t = await sequelize.transaction();
  
  try {
    const { firstName, lastName, street, zipcode, email, refno, total, image, UserId, ProductId } = req.body;
    const product = await Products.findByPk(ProductId, { transaction: t });

    if (!product) {
      await t.rollback();
      return res.status(404).json({ error: "Product not found" });
    }
    if (product.quantity < 1) {
      await t.rollback();
      return res.status(400).json({ error: "Product out of stock" });
    }
    product.quantity -= 1;
    await product.save({ transaction: t });

    const checkout = await Checkouts.create({
      firstName: firstName,
      lastName: lastName,
      street: street,
      zipcode: zipcode,
      email: email,
      refno: refno,
      total: total,
      image: image,
      UserId: UserId,
      ProductId: ProductId,
    }, { transaction: t });

    await t.commit();

    res.json(checkout);
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: error.message });
  }
});

// DISPLAY ALL CHECKOUTS NI LODS WOW
router.get("/", async (req, res) => {
  try {
    const checkout = await Checkouts.findAll({
      include: [
        { model: Users, as: "checkoutuser" },
        { model: Products, as: "product" },
      ],
    });

    res.status(200).json(checkout);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// DISPLAY TOTAL SALES
router.get("/sales", async (req, res) => {
  try {
    const checkouts = await Checkouts.findAll();

    // Calculate the total sales
    const totalSales = checkouts.reduce((total, checkout) => {
      return total + checkout.total;
    }, 0);

    res.status(200).json({ checkouts, totalSales });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE BY ID sheesh escodero
router.delete('/:id', async(req,res)=>{
  const id = req.params.id;

  try{
      const product = await Checkouts.findByPk(id);

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