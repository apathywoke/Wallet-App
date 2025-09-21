/**
 * Основной серверный файл приложения Wallet App
 * 
 * Основные функции:
 * - Настройка Express сервера
 * - Подключение к MongoDB Atlas
 * - Настройка middleware (CORS, Helmet, Rate Limiting)
 * - API endpoints для авторизации (регистрация, вход)
 * - JWT токены и аутентификация
 * - Обработка ошибок и валидация данных
 * - Безопасность (rate limiting, account locking)
 */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

// ===== ИМПОРТ МОДЕЛЕЙ =====
const User = require('./models/User');

// ===== ИМПОРТ MIDDLEWARE =====
const auth = require('./middleware/auth');                    // JWT аутентификация
const { validateRegister, validateLogin, handleValidationErrors } = require('./middleware/validation'); // Валидация данных
const { apiLimiter, authLimiter } = require('./middleware/rateLimiting'); // Ограничение запросов

// ===== ИМПОРТ УТИЛИТ =====
const { generateTokenPair } = require('./utils/jwt');         // Генерация JWT токенов

const app = express();

// ===== НАСТРОЙКА MIDDLEWARE =====

// Безопасность: Helmet для защиты HTTP заголовков
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Ограничение количества запросов (защита от DDoS и brute force)
app.use('/api/', apiLimiter);        // Общее ограничение для всех API
app.use('/api/auth/', authLimiter);  // Строгое ограничение для авторизации

// CORS конфигурация (разрешение cross-origin запросов)
const corsOptions = {
  origin: process.env.CORS_ORIGIN ? 
    process.env.CORS_ORIGIN.split(',') : 
    ['http://localhost:3000', 'http://localhost:3001'], // Разрешенные домены
  credentials: true,                                    // Разрешение cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Разрешенные HTTP методы
  allowedHeaders: ['Content-Type', 'Authorization'],    // Разрешенные заголовки
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Парсинг тела запроса
app.use(express.json({ limit: '10mb' }));                    // JSON до 10MB
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // URL-encoded до 10MB

// ===== ПОДКЛЮЧЕНИЕ К БАЗЕ ДАННЫХ =====

/**
 * Подключение к MongoDB Atlas
 * Использует переменную окружения MONGODB_URI или fallback на локальную БД
 */
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/wallet-app';
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,      // Использовать новый парсер URL
      useUnifiedTopology: true,   // Использовать новый движок топологии
    });
    
    console.log('✅ Connected to MongoDB Atlas');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1); // Завершить процесс при ошибке подключения
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
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (error) {
    console.error('Error during graceful shutdown:', error);
    process.exit(1);
  }
});

// ===== API ENDPOINTS =====

// Проверка состояния сервера
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Schizo Wallet App API',
    version: '1.0.0'
  });
});

/**
 * POST /api/auth/register - Регистрация нового пользователя
 * 
 * Middleware:
 * - validateRegister: валидация данных регистрации
 * - handleValidationErrors: обработка ошибок валидации
 * 
 * Функции:
 * - Проверка существования пользователя
 * - Хеширование пароля
 * - Создание пользователя в БД
 * - Генерация JWT токенов
 * - Возврат токенов и данных пользователя
 */
app.post('/api/auth/register', 
  validateRegister,      // Валидация email и пароля
  handleValidationErrors, // Обработка ошибок валидации
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
        isEmailVerified: false // In production, implement email verification
      });
      
      await user.save();

      // Generate token pair
      const tokens = generateTokenPair(user._id);

      // Log successful registration
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

// Login endpoint
app.post('/api/auth/login',
  validateLogin,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Find user
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

      // Check password (this also handles account locking)
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

      // Generate token pair
      const tokens = generateTokenPair(user._id);

      // Log successful login
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

// Logout endpoint (optional - mainly for logging)
app.post('/api/auth/logout', auth, async (req, res) => {
  try {
    // In a production app, you might want to blacklist the token
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
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`🚀 Schizo Wallet App API server running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔒 CORS enabled for: ${corsOptions.origin}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();