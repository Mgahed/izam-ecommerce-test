import api from './api';

const OrderService = {
    getOrders: async (page = 1) => {
        try {
            const response = await api.get('/orders', {
                params: { page }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getOrder: async (id) => {
        try {
            const response = await api.get(`/orders/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createOrder: async (products) => {
        try {
            const response = await api.post('/orders', { products });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default OrderService;
