import api from './api';

const CategoryService = {
    getCategories: async () => {
        try {
            const response = await api.get('/categories');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default CategoryService;
