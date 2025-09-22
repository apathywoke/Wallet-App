/**
 * Simple API exports
 * 
 * Centralized exports for all API functionality
 */

// Base configuration
export { apiClient, handleApiError } from './base/axios';
export type { ApiResponse, ApiError } from './base/axios';

// Auth endpoints
export { 
  loginUser, 
  registerUser, 
  logoutUser, 
  verifyToken 
} from './endpoints/auth';

// User endpoints
export { 
  getUserProfile, 
  updateUserProfile, 
  changeUserPassword, 
  getUserStats, 
  deleteUserAccount 
} from './endpoints/user';

// Types
export type { 
  LoginRequest, 
  RegisterRequest, 
  LoginResponse, 
  RegisterResponse,
  AuthUser,
  TokenPayload 
} from './types/auth';

export type { 
  UserProfile, 
  UserStats,
  UpdateProfileRequest,
  ChangePasswordRequest 
} from './types/user';

