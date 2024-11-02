//src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/auth',
});

export const signup = (data) => api.post('/signup', data);
export const login = (data) => api.post('/login', data);
export const forgotPassword = (data) => api.post('/forgot-password', data);
export const resetPassword = (data) => api.post('/reset-password', data);

export default api;



