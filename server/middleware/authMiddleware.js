const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Ensure this matches your filename: user.js

const protect = async (req, res, next) => {
  let token;

  // 1. Check for token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // 2. Verify token using .env secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Attach user to request (minus password)
      req.user = await User.findById(decoded.id).select('-password');
      
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token invalid' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

// 4. Added Admin-only gatekeeper
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Curators only' });
  }
};

module.exports = { protect, admin };