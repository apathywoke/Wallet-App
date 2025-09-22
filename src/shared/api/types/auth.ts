/**
 * Authentication API types
 * 
 * Production-ready type definitions for auth endpoints
 */

// Request types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

// Response types
export interface AuthUser {
  id: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
  message: string;
  user: AuthUser;
}

export interface RegisterResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
  message: string;
  user: AuthUser;
}

// Error types
export interface AuthError {
  error: string;
  details?: Array<{
    field: string;
    message: string;
  }>;
  statusCode: number;
}

// Token payload type
export interface TokenPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

