/**
 * Simple user initialization hook
 * 
 * Restores user state from localStorage on app start
 */

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeUser } from './slice';

export const useInitializeUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser()); // Restore user state from localStorage
  }, [dispatch]);
};
