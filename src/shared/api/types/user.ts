/**
 * User API types
 * 
 * Production-ready type definitions for user endpoints
 */

// Request types
export interface UpdateProfileRequest {
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Response types
export interface UserProfile {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export interface UserStats {
  totalTransactions: number;
  totalBalance: number;
  lastTransactionDate?: string;
}

// Error types
export interface UserError {
  error: string;
  details?: Array<{
    field: string;
    message: string;
  }>;
  statusCode: number;
}

