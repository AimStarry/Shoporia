const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true 
  },
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  gender: { 
    type: String 
  },
  birthDate: { 
    type: String 
  },
  contactNumber: { 
    type: String 
  },
  role: { 
    type: String, 
    default: 'user', 
    enum: ['user', 'admin']
  }
}, { 
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);