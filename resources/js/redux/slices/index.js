import cartReducer, {
    loadCart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart
} from './cartSlice';

import authReducer, {
    loadUser,
    login,
    register,
    logout
} from './authSlice';

// Export all reducers
export {
    cartReducer,
    authReducer
};

// Export all actions and thunks
export {
    // Cart actions
    loadCart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,

    // Auth actions/thunks
    loadUser,
    login,
    register,
    logout
};
