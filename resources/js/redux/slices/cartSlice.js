import { createSlice } from '@reduxjs/toolkit';

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

const calculateCartTotals = (items) => {
    const itemCount = items.reduce((count, item) => count + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { itemCount, total };
};

const initialState = {
    items: [], // Array of cart item objects { ...product, quantity }
    itemCount: 0,
    total: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        loadCartFromStorage: (state) => {
            const loadedItems = loadCartFromLocalStorage();
            const loadedTotals = calculateCartTotals(loadedItems);
            state.items = loadedItems;
            state.itemCount = loadedTotals.itemCount;
            state.total = loadedTotals.total;
        },
        addToCart: (state, action) => {
            const existingItemIndex = state.items.findIndex(
                (item) => item.id === action.payload.id
            );

            if (existingItemIndex >= 0) {
                state.items[existingItemIndex].quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }

            const totals = calculateCartTotals(state.items);
            state.itemCount = totals.itemCount;
            state.total = totals.total;

            saveCartToLocalStorage(state.items);
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            const totals = calculateCartTotals(state.items);
            state.itemCount = totals.itemCount;
            state.total = totals.total;

            saveCartToLocalStorage(state.items);
        },
        updateCartQuantity: (state, action) => {
            const { productId, quantity } = action.payload;

            if (quantity <= 0) {
                state.items = state.items.filter(item => item.id !== productId);
            } else {
                const itemIndex = state.items.findIndex(item => item.id === productId);
                if (itemIndex >= 0) {
                    state.items[itemIndex].quantity = quantity;
                }
            }

            const totals = calculateCartTotals(state.items);
            state.itemCount = totals.itemCount;
            state.total = totals.total;

            saveCartToLocalStorage(state.items);
        },
        clearCart: (state) => {
            state.items = [];
            state.itemCount = 0;
            state.total = 0;

            saveCartToLocalStorage(state.items);
        }
    }
});

// Export actions
export const {
    loadCartFromStorage,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart
} = cartSlice.actions;

// Create thunks for the actions that need to be dispatched with getState
export const loadCart = () => (dispatch) => {
    dispatch(loadCartFromStorage());
};

// Export reducer
export default cartSlice.reducer;
