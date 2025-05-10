import * as actionTypes from '../actions/actionTypes';

const initialState = {
    items: [], // Array of cart item objects { ...product, quantity }
    itemCount: 0,
    total: 0,
};

const calculateCartTotals = (items) => {
    const itemCount = items.reduce((count, item) => count + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { itemCount, total };
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_CART_FROM_STORAGE:
            const loadedItems = action.payload;
            const loadedTotals = calculateCartTotals(loadedItems);
            return {
                ...state,
                items: loadedItems,
                itemCount: loadedTotals.itemCount,
                total: loadedTotals.total,
            };

        case actionTypes.ADD_TO_CART:
            const existingItemIndex = state.items.findIndex(
                (item) => item.id === action.payload.id
            );
            let updatedItemsAdd;
            if (existingItemIndex >= 0) {
                updatedItemsAdd = state.items.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: item.quantity + action.payload.quantity }
                        : item
                );
            } else {
                updatedItemsAdd = [...state.items, action.payload];
            }
            const addedTotals = calculateCartTotals(updatedItemsAdd);
            return {
                ...state,
                items: updatedItemsAdd,
                itemCount: addedTotals.itemCount,
                total: addedTotals.total,
            };

        case actionTypes.REMOVE_FROM_CART:
            const updatedItemsRemove = state.items.filter(
                (item) => item.id !== action.payload
            );
            const removedTotals = calculateCartTotals(updatedItemsRemove);
            return {
                ...state,
                items: updatedItemsRemove,
                itemCount: removedTotals.itemCount,
                total: removedTotals.total,
            };

        case actionTypes.UPDATE_CART_QUANTITY:
            const updatedItemsQuantity = state.items.map((item) =>
                item.id === action.payload.productId
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );
            const quantityTotals = calculateCartTotals(updatedItemsQuantity);
            return {
                ...state,
                items: updatedItemsQuantity,
                itemCount: quantityTotals.itemCount,
                total: quantityTotals.total,
            };

        case actionTypes.CLEAR_CART:
            return {
                ...state,
                items: [],
                itemCount: 0,
                total: 0,
            };

        default:
            return state;
    }
};

export default cartReducer;
