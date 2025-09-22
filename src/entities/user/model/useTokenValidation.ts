/**
 * Simple token validation hook
 * 
 * Validates stored token and logs out user if invalid
 */

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from './slice';
import { verifyToken } from '@/shared/api';

export const useTokenValidation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) return; // No token to validate

      try {
        const isValid = await verifyToken();
        if (!isValid) dispatch(logout()); // Logout if token invalid
      } catch (error) {
        console.error('Token validation failed:', error);
        dispatch(logout()); // Logout on validation error
      }
    };

    // Delay to ensure user state is initialized first
    const timeoutId = setTimeout(validateToken, 100);
    return () => clearTimeout(timeoutId);
  }, [dispatch]);
};
