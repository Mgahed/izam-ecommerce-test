import { useSelector, useDispatch } from 'react-redux';
import {
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart
} from '../slices/cartSlice';

export const useCart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    // Add to cart function
    const add = (product, quantity = 1) => {
        const cartItem = {
            ...product,
            quantity: quantity,
        };
        dispatch(addToCart(cartItem));
    };

    // Remove from cart function
    const remove = (productId) => {
        dispatch(removeFromCart(productId));
    };

    // Update quantity function
    const updateQuantity = (productId, quantity) => {
        dispatch(updateCartQuantity({ productId, quantity }));
    };

    // Clear cart function
    const clear = () => {
        dispatch(clearCart());
    };

    // Return the cart interface
    return {
        items: cart.items,
        itemCount: cart.itemCount,
        total: cart.total,
        add,
        remove,
        updateQuantity,
        clear
    };
};
