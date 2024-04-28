const express = require("express");
const router = express.Router();
const { EventCheckouts, Users, Events } = require("../models");

const sequelize = require('../models').sequelize;

// STORE CHECKOUT RARWR
router.post("/", async (req, res) => {
    const t = await sequelize.transaction();
    
    try {
      const { firstName, lastName, street, zipcode, email, refno, total, image, UserId, EventId } = req.body;
      const event = await Events.findByPk(EventId, { transaction: t });
  
      if (!event) {
        await t.rollback();
        return res.status(404).json({ error: "Event not found" });
      }
      if (event.quantity < 1) {
        await t.rollback();
        return res.status(400).json({ error: "Event ticket out of stock" });
      }
      event.quantity -= 1;
      await event.save({ transaction: t });
  
      const checkout = await EventCheckouts.create({
        firstName: firstName,
        lastName: lastName,
        street: street,
        zipcode: zipcode,
        email: email,
        refno: refno,
        total: total,
        image: image,
        UserId: UserId,
        EventId: EventId,
      }, { transaction: t });
  
      await t.commit();
  
      res.json(checkout);
    } catch (error) {
      await t.rollback();
      res.status(500).json({ error: error.message });
    }
  });

  // DISPLAY ALL CHECKOUTS NI LODS WOW -- TANAN NI YA E DISPLAY
router.get("/", async (req, res) => {
    try {
      const checkout = await EventCheckouts.findAll({
        include: [
          { model: Users, as: "eventcheckoutuser" },
          { model: Events, as: "event" },
        ],
      });
  
      res.status(200).json(checkout);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  });

// DISPLAY ANG TANAN NGA CHECKOUT NGA GN BAKAL KA CUSTOMER
router.get("/byUserId/:UserId", async (req, res) => {
    const UserId = req.params.UserId;
    const checkout = await EventCheckouts.findAll({
      include: [
        { model: Events, as: "event" },
        { model: Users, as: "checkoutuser" },
      ],
      where: { UserId : UserId }
    });
    res.json(checkout);
  
  })

  // ARI NAMAN DI YA MA DISPLAY KA SANG TOTAL NGA AMOUNT NGA PURCHASE SANG NAG LOGGED IN NGA USER MAN GYAPON DEPOTA LEZGAWWW
router.get("/salesByUser/:UserId", async (req, res) => {
    const UserId = req.params.UserId;
    try {
      const checkouts = await EventCheckouts.findAll({
        where: { UserId: UserId }
      })
  
      const totalSales = checkouts.reduce((total, checkout) => {
        return total + checkout.total;
      }, 0);
  
      res.status(200).json({ checkouts, totalSales });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  });

  // DIRI NAMAN MA DISPLAY ANG TOTAL NGA EARNINGS, EARNINGS PRE HA SANG ARTIST NGA NAG LOGGED IN.
router.get("/earnings/:EventId", async (req, res) => {
    const EventId = req.params.EventId;
    try {
      const events = await Events.findByPk(EventId);
      if (!events) {
        return res.status(404).json({ error: "Event not found" });
      }
  
      const checkouts = await EventCheckouts.findAll({
        where: { EventId: EventId }
      });
  
      const totalEarnings = checkouts.reduce((total, checkout) => {
        return total + checkout.total;
      }, 0);
      
      res.status(200).json({ events, checkouts, totalEarnings });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  });

  // DISPLAY TOTAL SALES
router.get("/sales", async (req, res) => {
    try {
      const checkouts = await EventCheckouts.findAll();
  
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
        const checkout = await EventCheckouts.findByPk(id);
  
        if(checkout){
            await checkout.destroy();
            res.status(204).send();
        }
    }catch(error){
        console.log(error);
        res.status(500).json({error: error.message});
    }
  })

  module.exports = router;