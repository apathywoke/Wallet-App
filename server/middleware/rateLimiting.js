/**
 * Middleware для ограничения количества запросов (Rate Limiting)
 * 
 * Основные функции:
 * - Защита от DDoS атак
 * - Защита от brute force атак на авторизацию
 * - Ограничение нагрузки на сервер
 * - Разные лимиты для разных типов endpoints
 */

const rateLimit = require('express-rate-limit');

// Общее ограничение для всех API endpoints
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Окно времени: 15 минут
  max: 100,                 // Максимум 100 запросов с одного IP за 15 минут
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,    // Добавлять заголовки RateLimit-* в ответ
  legacyHeaders: false,     // Не добавлять устаревшие заголовки X-RateLimit-*
});

// Строгое ограничение для endpoints авторизации (защита от brute force)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Окно времени: 15 минут
  max: 5,                   // Максимум 5 попыток авторизации с одного IP за 15 минут
  message: {
    error: 'Too many authentication attempts, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful requests
});

// Very strict rate limiting for password reset
const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each IP to 3 password reset requests per hour
  message: {
    error: 'Too many password reset attempts, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  apiLimiter,
  authLimiter,
  passwordResetLimiter
};
