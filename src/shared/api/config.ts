export const API_URL = 'http://localhost:5002/api';

export const ENDPOINTS = {
    LOGIN: `${API_URL}/auth/login`,
    REGISTER: `${API_URL}/auth/register`,
    USER_PROFILE: `${API_URL}/user/profile`,
} as const;
