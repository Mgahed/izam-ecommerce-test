import * as actionTypes from './actionTypes';

// Helper function to save cart to localStorage
const saveCartToLocalStorage = (cartItems) => {
    try {
        const serializedCart = JSON.stringify(cartItems);
        localStorage.setItem('cart', serializedCart);
    } catch (e) {
        console.error("Could not save cart to local storage", e);
    }
};

// Helper function to load cart from localStorage
const loadCartFromLocalStorage = () => {
    try {
        const serializedCart = localStorage.getItem('cart');
        if (serializedCart === null) {
            return [];
        }
        return JSON.parse(serializedCart);
    } catch (e) {
        console.error("Could not load cart from local storage", e);
        return [];
    }
};

export const loadCart = () => {
    const items = loadCartFromLocalStorage();
    return {
        type: actionTypes.LOAD_CART_FROM_STORAGE,
        payload: items,
    };
};

export const addToCart = (product, quantity = 1) => (dispatch, getState) => {
    const cartItem = {
        ...product,
        quantity: quantity,
    };
    dispatch({
        type: actionTypes.ADD_TO_CART,
        payload: cartItem,
    });
    saveCartToLocalStorage(getState().cart.items);
};

export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        payload: productId,
    });
    saveCartToLocalStorage(getState().cart.items);
};

export const updateCartQuantity = (productId, quantity) => (dispatch, getState) => {
    // Dispatch the update action regardless of quantity
    dispatch({
        type: actionTypes.UPDATE_CART_QUANTITY,
        payload: { productId, quantity },
    });

    // If quantity is 0, also dispatch remove action to maintain consistency
    if (quantity <= 0) {
        dispatch({
            type: actionTypes.REMOVE_FROM_CART,
            payload: productId,
        });
    }

    saveCartToLocalStorage(getState().cart.items);
};

export const clearCart = () => (dispatch, getState) => {
    dispatch({
        type: actionTypes.CLEAR_CART,
    });
    saveCartToLocalStorage(getState().cart.items);
};
