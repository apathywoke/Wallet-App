/**
 * Simple user API endpoints
 * 
 * Handles user profile and account management
 */

import { apiClient, handleApiError } from '../base/axios';
import type { 
  UserProfile, 
  UserStats,
  UpdateProfileRequest,
  ChangePasswordRequest
} from '../types/user';

// Get current user profile
export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const response = await apiClient.get<UserProfile>('/user/profile');
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

// Update user profile
export const updateUserProfile = async (data: UpdateProfileRequest): Promise<UserProfile> => {
  try {
    const response = await apiClient.patch<UserProfile>('/user/profile', data);
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

// Change user password
export const changeUserPassword = async (data: ChangePasswordRequest): Promise<void> => {
  try {
    await apiClient.patch('/user/password', data);
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

// Get user statistics
export const getUserStats = async (): Promise<UserStats> => {
  try {
    const response = await apiClient.get<UserStats>('/user/stats');
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

// Delete user account
export const deleteUserAccount = async (): Promise<void> => {
  try {
    await apiClient.delete('/user/account');
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

