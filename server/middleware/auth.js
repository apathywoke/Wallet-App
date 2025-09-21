/**
 * Middleware для JWT аутентификации
 * 
 * Основные функции:
 * - Проверка наличия JWT токена в заголовке Authorization
 * - Валидация токена и извлечение данных пользователя
 * - Проверка существования пользователя в БД
 * - Добавление данных пользователя в req.user
 * - Обработка ошибок аутентификации
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware аутентификации
 * Проверяет JWT токен и добавляет данные пользователя в req.user
 */
const auth = async (req, res, next) => {
  try {
    // Получение токена из заголовка Authorization
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
      return res.status(401).json({ 
        error: 'Access denied. No token provided.' 
      });
    }

    // Извлечение токена из формата "Bearer <token>"
    const token = authHeader.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Access denied. Invalid token format.' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key');
    
    // Check if user still exists
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        error: 'Access denied. User not found.' 
      });
    }

    // Add user info to request
    req.user = user;
    req.token = token;
    next();
    
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        error: 'Access denied. Invalid token.' 
      });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Access denied. Token expired.' 
      });
    } else {
      console.error('Auth middleware error:', error);
      return res.status(500).json({ 
        error: 'Internal server error during authentication.' 
      });
    }
  }
};

module.exports = auth;
