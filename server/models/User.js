/**
 * Модель пользователя для MongoDB
 * 
 * Основные функции:
 * - Хранение данных пользователя (email, пароль)
 * - Автоматическое хеширование паролей
 * - Защита от brute force атак (блокировка аккаунта)
 * - Отслеживание попыток входа
 * - Валидация email и пароля
 * - Поддержка JWT refresh токенов
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Схема пользователя с валидацией и безопасностью
const userSchema = new mongoose.Schema({
  // Email пользователя (уникальный, обязательный)
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,                    // Уникальность в БД
    lowercase: true,                 // Приведение к нижнему регистру
    trim: true,                      // Удаление пробелов
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'] // Валидация формата
  },
  
  // Пароль (хешированный, обязательный)
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long']
  },
  
  // Статус верификации email
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  
  // Последний вход в систему
  lastLogin: {
    type: Date,
    default: null
  },
  
  // Счетчик неудачных попыток входа (для защиты от brute force)
  loginAttempts: {
    type: Number,
    default: 0
  },
  
  // Время блокировки аккаунта (если превышено количество попыток)
  lockUntil: {
    type: Date,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      delete ret.loginAttempts;
      delete ret.lockUntil;
      return ret;
    }
  }
});

// Indexes for performance
userSchema.index({ email: 1 });
userSchema.index({ createdAt: 1 });

// Virtual for checking if account is locked
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12); // Increased salt rounds for better security
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password for login
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (this.isLocked) {
    throw new Error('Account is temporarily locked');
  }
  
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  
  if (!isMatch) {
    this.loginAttempts += 1;
    
    // Lock account after 5 failed attempts for 30 minutes
    if (this.loginAttempts >= 5) {
      this.lockUntil = Date.now() + 30 * 60 * 1000; // 30 minutes
    }
    
    await this.save();
    return false;
  }
  
  // Reset login attempts on successful login
  if (this.loginAttempts > 0) {
    this.loginAttempts = 0;
    this.lockUntil = null;
  }
  
  this.lastLogin = new Date();
  await this.save();
  
  return true;
};

// Method to unlock account
userSchema.methods.unlock = function() {
  this.loginAttempts = 0;
  this.lockUntil = null;
  return this.save();
};

module.exports = mongoose.model('User', userSchema);