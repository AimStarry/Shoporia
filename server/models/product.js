const mongoose = require('mongoose');

// --- REVIEW SCHEMA ---
const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true }, // User's full name
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
}, {
  timestamps: true,
});

// --- PRODUCT SCHEMA ---
const ProductSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true, 
    default: 0 
  },
  image: { 
    type: String, 
    required: true 
  }, 
  category: { 
    type: String, 
    required: true 
  }, 
  brand: {
    type: String,
    default: 'Shoporia'
  },
  color: { 
    type: String 
  },
  size: { 
    type: String 
  },
  
  // Inventory Management
  countInStock: { 
    type: Number, 
    required: true, 
    default: 0 
  },
  
  // Executive Controls
  isFeatured: { 
    type: Boolean, 
    required: true, 
    default: false 
  },

  // --- REVIEW SYSTEM FIELDS ---
  reviews: [reviewSchema],
  numReviews: { 
    type: Number, 
    required: true,
    default: 0 
  },
  rating: { 
    type: Number, 
    required: true,
    default: 0 
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Product', ProductSchema);