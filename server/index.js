/**
 * Simple Express server for Wallet App
 * 
 * Handles authentication, user management, and API endpoints
 */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

// Import models and middleware
const User = require('./models/User');
const auth = require('./middleware/auth');
const { validateRegister, validateLogin, handleValidationErrors } = require('./middleware/validation');
const { apiLimiter, authLimiter } = require('./middleware/rateLimiting');
const { generateTokenPair } = require('./utils/jwt');

const app = express();

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Rate limiting for API protection
app.use('/api/', apiLimiter); // General API rate limit
app.use('/api/auth/', authLimiter); // Strict auth rate limit

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN ? 
    process.env.CORS_ORIGIN.split(',') : 
    ['http://localhost:3000', 'http://localhost:3001'], // Allowed origins
  credentials: true, // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Parse request body
app.use(express.json({ limit: '10mb' })); // JSON parsing
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // URL-encoded parsing

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/wallet-app';
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true, // Use new URL parser
      useUnifiedTopology: true, // Use new topology engine
    });
    
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1); // Exit on connection error
  }
};

// Handle MongoDB connection events
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});

// API endpoints

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Wallet App API',
    version: '1.0.0'
  });
});

// User registration endpoint
app.post('/api/auth/register', 
  validateRegister, // Validate email and password
  handleValidationErrors, // Handle validation errors
  async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ 
          error: 'User with this email already exists' 
        });
      }

      // Create new user
      const user = new User({ 
        email, 
        password,
        isEmailVerified: false // Email verification not implemented
      });
      
      await user.save();

      // Generate JWT tokens
      const tokens = generateTokenPair(user._id);

      console.log(`✅ New user registered: ${email}`);

      res.status(201).json({
        message: 'Registration successful',
        ...tokens,
        user: {
          id: user._id,
          email: user.email,
          isEmailVerified: user.isEmailVerified,
          createdAt: user.createdAt
        }
      });
      
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(err => ({
          field: err.path,
          message: err.message
        }));
        return res.status(400).json({ 
          error: 'Validation failed', 
          details: errors 
        });
      }
      
      res.status(500).json({ 
        error: 'Internal server error during registration' 
      });
    }
  }
);

// User login endpoint
app.post('/api/auth/login',
  validateLogin, // Validate login data
  handleValidationErrors, // Handle validation errors
  async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ 
          error: 'Invalid email or password' 
        });
      }

      // Check if account is active
      if (!user.isActive) {
        return res.status(403).json({ 
          error: 'Account is deactivated. Please contact support.' 
        });
      }

      // Verify password with brute force protection
      try {
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          return res.status(401).json({ 
            error: 'Invalid email or password' 
          });
        }
      } catch (error) {
        if (error.message === 'Account is temporarily locked') {
          return res.status(423).json({ 
            error: 'Account is temporarily locked due to too many failed attempts. Please try again later.' 
          });
        }
        throw error;
      }

      // Generate JWT tokens
      const tokens = generateTokenPair(user._id);

      console.log(`✅ User logged in: ${email}`);

      res.json({
        message: 'Login successful',
        ...tokens,
        user: {
          id: user._id,
          email: user.email,
          isEmailVerified: user.isEmailVerified,
          lastLogin: user.lastLogin
        }
      });
      
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ 
        error: 'Internal server error during login' 
      });
    }
  }
);

// Token verification endpoint
app.get('/api/auth/verify', auth, async (req, res) => {
  try {
    res.json({
      valid: true,
      user: req.user
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({ 
      error: 'Internal server error during token verification' 
    });
  }
});

// Get user profile (protected route)
app.get('/api/user/profile', auth, async (req, res) => {
  try {
    res.json({
      user: req.user
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ 
      error: 'Internal server error while fetching profile' 
    });
  }
});

// Logout endpoint
app.post('/api/auth/logout', auth, async (req, res) => {
  try {
    console.log(`✅ User logged out: ${req.user.email}`);
    
    res.json({
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ 
      error: 'Internal server error during logout' 
    });
  }
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    error: 'API endpoint not found',
    path: req.originalUrl
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  
  res.status(500).json({
    error: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { details: error.message })
  });
});

// Start server
const PORT = process.env.PORT || 5002;

const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    
    app.listen(PORT, () => {
      console.log(`🚀 Wallet App API server running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔒 CORS enabled for: ${corsOptions.origin}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();