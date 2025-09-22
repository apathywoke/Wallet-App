/**
 * Redux slice for user authentication state management
 * 
 * Features:
 * - Manages user authentication state
 * - Persists JWT token in localStorage
 * - Handles login/logout actions
 * - Auto-initializes from stored token
 */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from './types';

// Restore user state from localStorage
const getUserFromStorage = (): User => {
    try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('userData');
        
        if (token && userData) {
            const { id, email } = JSON.parse(userData);
            return { isAuthenticated: true, id, email, token };
        }
    } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token'); // Clear corrupted data
        localStorage.removeItem('userData');
    }
    
    return { isAuthenticated: false, id: '', email: '', token: '' };
};

// Initialize state from localStorage
const initialState: User = getUserFromStorage();

// Persist user data to localStorage
const saveUserData = (id: string, email: string, token: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userData', JSON.stringify({ id, email }));
};

// Clear user data from localStorage
const clearUserData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ id: string; email: string; token: string }>) => {
            const { id, email, token } = action.payload;
            Object.assign(state, { id, email, token, isAuthenticated: true });
            saveUserData(id, email, token); // Persist to localStorage
        },
        logout: (state) => {
            Object.assign(state, { id: '', email: '', token: '', isAuthenticated: false });
            clearUserData(); // Clear localStorage
        },
        initializeUser: (state) => {
            const storedUser = getUserFromStorage();
            Object.assign(state, storedUser); // Restore from localStorage
        },
    },
});

export const { login, logout, initializeUser } = userSlice.actions;
export const userReducer = userSlice.reducer;

// Export selectors
export * from './selectors';