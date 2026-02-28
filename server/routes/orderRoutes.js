const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); 
const { protect, admin } = require('../middleware/authMiddleware');

// @route   GET /api/orders/myorders
// @desc    Get logged-in user orders
// @access  Private
router.get('/myorders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch your order history" });
  }
});

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { 
      items, 
      shippingAddress, 
      paymentMethod, 
      subtotal, 
      shipping, 
      total 
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = new Order({
      user: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      shipping,
      total
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// @route   GET /api/orders
// @desc    Get all orders (Admin Only)
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'firstName lastName email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/** * NEW ROUTE ADDED BELOW 
 * This fixes the 404 error when clicking "Detail"
 */
// @route   GET /api/orders/:id
// @desc    Get order by ID (Admin Only)
// @access  Private/Admin
router.get('/:id', protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'firstName lastName email');
    
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order archive not found' });
    }
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Invalid Order Reference ID' });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status (Admin Only)
// @access  Private/Admin
router.put('/:id/status', protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = req.body.status || order.status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;