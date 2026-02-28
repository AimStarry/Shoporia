// models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  // FIX: Changed from userId to user to match the naming used in orderRoutes.js
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  items: [{
    productId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product' 
    },
    name: String,
    price: Number,
    quantity: Number,
    image: String,
    color: String,
    size: String
  }],
  subtotal: {
    type: Number,
    required: true,
    default: 0
  },
  shipping: {
    type: Number,
    required: true,
    default: 0
  },
  total: {
    type: Number,
    required: true,
    default: 0
  },
  status: { 
    type: String, 
    default: 'Processing',
    enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'] 
  },
  paymentMethod: { 
    type: String, 
    required: true 
  }, // e.g., 'COD' or 'Card'
  shippingAddress: {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    zip: { type: String, required: true }
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Order', OrderSchema);