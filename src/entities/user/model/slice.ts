import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from './types';

const initialState: User = {
    isAuthenticated: Boolean(localStorage.getItem('token')),
    id: '',
    email: '',
    token: localStorage.getItem('token') || ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ id: string; email: string; token: string }>) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem('token', action.payload.token);
        },
        logout: (state) => {
            state.id = '';
            state.email = '';
            state.token = '';
            state.isAuthenticated = false;
            localStorage.removeItem('token');
        },
    },
});

export const { login, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;