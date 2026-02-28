require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

// --- 1. Middleware ---
app.use(cors());
app.use(express.json());

// Ensure 'uploads' directory exists
const uploadDir = path.join(__dirname, '/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Static folder for images
app.use('/uploads', express.static(uploadDir));

// --- 2. Database Connection ---
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Shoporia Database Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Database Error: ${err.message}`);
    process.exit(1);
  }
};
connectDB();

// --- 3. Routes ---
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));

// --- 4. Global Error Handler ---
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Shoporia Server active on port ${PORT}`);
});