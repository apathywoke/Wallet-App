/**
 * User entity selectors
 * 
 * Production-ready selectors for accessing user state
 */

import type { RootState } from '@/app/store';

// Basic selectors
export const selectUser = (state: RootState) => state.user;

export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;

export const selectUserToken = (state: RootState) => state.user.token;

export const selectUserId = (state: RootState) => state.user.id;

export const selectUserEmail = (state: RootState) => state.user.email;

// Computed selectors
export const selectUserDisplayName = (state: RootState) => {
  const user = state.user;
  return user.email || 'Guest';
};

export const selectIsUserLoggedIn = (state: RootState) => {
  return state.user.isAuthenticated && !!state.user.token;
};

export const selectUserInitials = (state: RootState) => {
  const email = state.user.email;
  if (!email) return 'G';
  
  const [username] = email.split('@');
  return username.slice(0, 2).toUpperCase();
};

// Memoized selectors (for complex computations)
export const selectUserSession = (state: RootState) => {
  const user = state.user;
  return {
    isAuthenticated: user.isAuthenticated,
    hasToken: !!user.token,
    userId: user.id,
    email: user.email,
  };
};

