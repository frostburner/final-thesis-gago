const express = require('express');
const router = express.Router();
const { Messages } = require('../models');

// Create a new message
router.post('/', async (req, res) => {
  try {
    const { content, username, ConversationId } = req.body;
    const newMessage = await Messages.create({
      content,
      username,
      ConversationId,
    });

    res.json(newMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all messages
router.get('/', async (req, res) => {
  try {
    const { ConversationId } = req.query;
    let messages;
    if (ConversationId) {
      messages = await Messages.findAll({ where: { ConversationId } });
    } else {
      messages = await Messages.findAll();
    }
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;