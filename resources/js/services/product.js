import api from './api';

const ProductService = {
    getProducts: async (params = {}) => {
        try {
            const response = await api.get('/products', { params });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getProduct: async (id) => {
        try {
            const response = await api.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default ProductService;
