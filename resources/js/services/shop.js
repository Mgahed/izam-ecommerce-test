import api from './api';

const ShopService = {
    getSettings: async () => {
        try {
            const response = await api.get('/settings');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default ShopService;
