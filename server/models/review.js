// models/Review.js
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);