const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');
const { protect, admin } = require('../middleware/authMiddleware');

// @route   POST /api/contacts
// @desc    Submit a new contact message (Public)
router.post('/', async (req, res) => {
  try {
    const { fullName, email, contactNumber, message } = req.body;
    
    if (!fullName || !email || !message) {
      return res.status(400).json({ message: "Please fill in all required fields" });
    }

    const newMessage = new Contact({ 
      name: fullName, 
      email, 
      contactNumber, 
      message 
    });

    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/contacts
// @desc    Get all contact messages (Admin Only)
router.get('/', protect, admin, async (req, res) => {
  try {
    const messages = await Contact.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   DELETE /api/contacts/:id
// @desc    Delete an inquiry (Admin Only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Inquiry removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;