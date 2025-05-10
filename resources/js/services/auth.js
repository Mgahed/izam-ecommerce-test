import api from './api';

const AuthService = {
    login: async (email, password) => {
        try {
            const response = await api.post('/login', { email, password });
            if (response.data.access_token) {
                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    register: async (name, email, password, password_confirmation) => {
        try {
            const response = await api.post('/register', {
                name,
                email,
                password,
                password_confirmation
            });
            if (response.data.access_token) {
                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    logout: async () => {
        try {
            await api.post('/logout');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        } catch (error) {
            console.error('Logout error', error);
            // Still remove items even if API call fails
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            return JSON.parse(userStr);
        }
        return null;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};

export default AuthService;
