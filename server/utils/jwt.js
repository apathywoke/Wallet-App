/**
 * Утилиты для работы с JWT токенами
 * 
 * Основные функции:
 * - Генерация access токенов (короткоживущие)
 * - Генерация refresh токенов (долгоживущие)
 * - Генерация пары токенов (access + refresh)
 * - Настройка времени жизни токенов
 * - Безопасное хранение секретного ключа
 */

const jwt = require('jsonwebtoken');

// Конфигурация JWT токенов
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';        // Секретный ключ для подписи
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';                        // Время жизни access токена
const JWT_REFRESH_EXPIRE = process.env.JWT_REFRESH_EXPIRE || '30d';       // Время жизни refresh токена

/**
 * Генерация access токена (для авторизации API запросов)
 * @param {string} userId - ID пользователя
 * @returns {string} JWT access токен
 */
const generateAccessToken = (userId) => {
  return jwt.sign(
    { userId, type: 'access' },  // Полезная нагрузка токена
    JWT_SECRET,                  // Секретный ключ
    { expiresIn: JWT_EXPIRE }    // Время жизни токена
  );
};

/**
 * Generate refresh token
 * @param {string} userId - User ID
 * @returns {string} JWT refresh token
 */
const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId, type: 'refresh' },
    JWT_SECRET,
    { expiresIn: JWT_REFRESH_EXPIRE }
  );
};

/**
 * Generate both access and refresh tokens
 * @param {string} userId - User ID
 * @returns {Object} Object containing access and refresh tokens
 */
const generateTokenPair = (userId) => {
  return {
    accessToken: generateAccessToken(userId),
    refreshToken: generateRefreshToken(userId),
    expiresIn: JWT_EXPIRE
  };
};

/**
 * Verify JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object} Decoded token payload
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw error;
  }
};

/**
 * Decode JWT token without verification (for expired tokens)
 * @param {string} token - JWT token to decode
 * @returns {Object} Decoded token payload
 */
const decodeToken = (token) => {
  return jwt.decode(token);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateTokenPair,
  verifyToken,
  decodeToken
};
