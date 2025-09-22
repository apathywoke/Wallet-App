/**
 * Simple JWT utilities
 * 
 * Handles token generation and verification
 */

const jwt = require('jsonwebtoken');

// JWT configuration
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key'; // Secret key for signing
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d'; // Access token lifetime
const JWT_REFRESH_EXPIRE = process.env.JWT_REFRESH_EXPIRE || '30d'; // Refresh token lifetime

// Generate access token for API authorization
const generateAccessToken = (userId) => {
  return jwt.sign(
    { userId, type: 'access' }, // Token payload
    JWT_SECRET, // Secret key
    { expiresIn: JWT_EXPIRE } // Token lifetime
  );
};

// Generate refresh token for token renewal
const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId, type: 'refresh' },
    JWT_SECRET,
    { expiresIn: JWT_REFRESH_EXPIRE }
  );
};

// Generate both access and refresh tokens
const generateTokenPair = (userId) => {
  return {
    accessToken: generateAccessToken(userId),
    refreshToken: generateRefreshToken(userId),
    expiresIn: JWT_EXPIRE
  };
};

// Verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw error;
  }
};

// Decode JWT token without verification
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
