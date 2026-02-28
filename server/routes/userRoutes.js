const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { protect, admin } = require('../middleware/authMiddleware');

// @route   POST /api/users/register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, gender, birthDate, contactNumber } = req.body;
    
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) return res.status(400).json({ message: "Username or Email already taken" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ 
      username, email, password: hashedPassword,
      firstName, lastName, gender, birthDate, contactNumber,
      role: 'user' 
    });

    await newUser.save();
    res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/users/register-admin
router.post('/register-admin', protect, admin, async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) return res.status(400).json({ message: "Username or Email already taken" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new User({
      username, email, password: hashedPassword,
      firstName, lastName, role: 'admin' 
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin authorized successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   DELETE /api/users/:id
// @desc    Remove a user from the directory (Admin Only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    // Prevent self-deletion
    if (req.params.id === req.user.id) {
      return res.status(400).json({ message: "Security Breach: You cannot delete your own administrative account." });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User successfully purged from directory" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/users/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ 
      token, 
      user: { 
        id: user._id, 
        username: user.username,
        email: user.email,
        role: user.role 
      } 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/users/profile
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (user) res.json(user);
    else res.status(404).json({ message: "User not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/users
router.get('/', protect, admin, async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;