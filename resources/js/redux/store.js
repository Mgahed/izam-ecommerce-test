import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { loadCart } from './slices/cartSlice';
import authReducer, { loadUser } from './slices/authSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
    },
    // Optional: Enable devtools with the same options as before
    devTools: process.env.NODE_ENV !== 'production',
});

// Load cart and user from local storage on store initialization
store.dispatch(loadCart());
store.dispatch(loadUser());

export default store;
