/**
 * Production-ready Axios configuration
 * 
 * Features:
 * - Base URL configuration
 * - Request/Response interceptors
 * - Error handling
 * - Token management
 * - Request timeout
 * - Retry logic for failed requests
 */

import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

// Environment-based configuration
const getApiBaseUrl = () => {
  try {
    return import.meta.env?.VITE_API_URL || 'http://localhost:5002/api';
  } catch (error) {
    return 'http://localhost:5002/api';
  }
};

const API_BASE_URL = getApiBaseUrl();
const REQUEST_TIMEOUT = 10000; // 10 seconds
const MAX_RETRIES = 3;

// Create axios instance with base configuration
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach JWT token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle auth errors and retries
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 - clear auth and redirect (skip for login requests)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Let login component handle its own errors
      if (originalRequest.url?.includes('/auth/login')) {
        return Promise.reject(error);
      }
      
      // Clear auth data and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/sign-in';
      return Promise.reject(error);
    }

    // Retry failed network requests
    if (!error.response && originalRequest._retryCount < MAX_RETRIES) {
      originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
      await new Promise(resolve => setTimeout(resolve, 1000 * originalRequest._retryCount)); // Exponential backoff
      return apiClient(originalRequest);
    }

    return Promise.reject(error);
  }
);

// Generic API response type
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

// Generic error response type
export interface ApiError {
  error: string;
  details?: Array<{
    field: string;
    message: string;
  }>;
  statusCode: number;
}

// Simple, clear error handling
const HTTP_ERROR_MESSAGES: Record<number, string> = {
  400: 'Invalid request data',
  401: 'Unauthorized access',
  403: 'Access forbidden',
  404: 'Resource not found',
  409: 'Resource already exists',
  422: 'Validation failed',
  423: 'Account temporarily locked',
  429: 'Too many requests',
  500: 'Internal server error',
};

export const handleApiError = (error: unknown): string => {
  if (!axios.isAxiosError(error)) {
    return 'An unexpected error occurred';
  }

  // Server error with custom message
  if (error.response?.data?.error) {
    return error.response.data.error;
  }

  // Validation errors
  if (error.response?.data?.details?.[0]?.message) {
    return error.response.data.details[0].message;
  }

  // HTTP status errors
  if (error.response?.status) {
    return HTTP_ERROR_MESSAGES[error.response.status] || 'An error occurred';
  }

  // Network errors
  if (error.request) {
    return 'Network error - please check your connection';
  }

  return 'An unexpected error occurred';
};
