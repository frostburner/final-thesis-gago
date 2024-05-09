const express = require('express');
const router = express.Router();
const { Conversations, Messages } = require('../models');

router.post('/', async (req, res) => {
    try {
        console.log('Received POST request to create a group:', req.body);

        const { groupname, username } = req.body;

        // Check if the group already exists
        const existingGroup = await Conversations.findOne({ where: { groupname } });
        if (existingGroup) {
            console.log('Group already exists:', existingGroup);
            return res.status(400).json({ error: 'Group already exists' });
        }

        // Create a new group
        const newGroup = await Conversations.create({ groupname, username });

        console.log('Group created successfully:', newGroup);

        res.json(newGroup);
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ error: error.message });
    }
});

// GET ALL GROUPCHAT NI TANAN
router.get("/", async (req, res) => {
  const conversation = await Conversations.findAll()
  res.json(conversation);
});

router.get('/chat/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const conversation = await Conversations.findByPk(id, {
            include: [{ model: Messages, as: 'messages' }],
        });
        if (!conversation) {
            return res.status(404).json({ error: 'Group not found' });
        }

        res.json(conversation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// GET: Retrieve messages between two users
router.get('/user/:userId/:otherUserId', async (req, res) => {
    const { userId, otherUserId } = req.params;
    try {
        const messages = await Messages.findAll({
            where: {
                [Op.or]: [
                    { senderId: userId, recipientId: otherUserId },
                    { senderId: otherUserId, recipientId: userId }
                ]
            }
        });
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages between users:', error);
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;