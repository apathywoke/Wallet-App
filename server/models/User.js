/**
 * Simple user model for MongoDB
 * 
 * Handles user data, password hashing, and brute force protection
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User schema with validation and security
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, // Ensure email uniqueness
    lowercase: true, // Normalize email case
    trim: true, // Remove whitespace
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long']
  },
  
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  
  lastLogin: {
    type: Date,
    default: null
  },
  
  loginAttempts: {
    type: Number,
    default: 0 // Track failed login attempts
  },
  
  lockUntil: {
    type: Date,
    default: null // Account lock timestamp
  },
  
  isActive: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password; // Never expose password
      delete ret.loginAttempts; // Hide security fields
      delete ret.lockUntil;
      return ret;
    }
  }
});

// Performance indexes
userSchema.index({ email: 1 });
userSchema.index({ createdAt: 1 });

// Check if account is locked
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12); // Strong salt for security
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password for login with brute force protection
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (this.isLocked) {
    throw new Error('Account is temporarily locked');
  }
  
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  
  if (!isMatch) {
    this.loginAttempts += 1; // Increment failed attempts
    
    // Lock account after 5 failed attempts for 30 minutes
    if (this.loginAttempts >= 5) {
      this.lockUntil = Date.now() + 30 * 60 * 1000; // 30 minutes lock
    }
    
    await this.save();
    return false;
  }
  
  // Reset attempts on successful login
  if (this.loginAttempts > 0) {
    this.loginAttempts = 0;
    this.lockUntil = null;
  }
  
  this.lastLogin = new Date(); // Update last login time
  await this.save();
  
  return true;
};

// Unlock account manually
userSchema.methods.unlock = function() {
  this.loginAttempts = 0;
  this.lockUntil = null;
  return this.save();
};

module.exports = mongoose.model('User', userSchema);