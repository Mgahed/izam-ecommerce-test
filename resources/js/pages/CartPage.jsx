import React, {useState, useEffect} from 'react';
import {
    Container,
    Box,
    Grid,
    Alert,
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import OrderService from '../services/order';
import ShopService from '../services/shop';
import {useSelector} from 'react-redux';
import { useCart } from '../redux/hooks';
import { useAuth } from '../redux/hooks';

// Import new components
import CartHeader from '../components/cart/CartHeader';
import CartList from '../components/cart/CartList';
import OrderSummary from '../components/cart/OrderSummary';
import EmptyCart from '../components/cart/EmptyCart';

const CartPage = () => {
    const { items: cart, total, clear: clearCart } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [settingsLoading, setSettingsLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [settings, setSettings] = useState({
        shipping: {flat_rate: 0},
        tax: {rate: 0}
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await ShopService.getSettings();
                setSettings(data);
            } catch (error) {
                console.error('Error fetching shop settings:', error);
            } finally {
                setSettingsLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleCheckout = async () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        if (cart.length === 0) {
            setError('Your cart is empty');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const products = cart.map(item => ({
                id: item.id,
                quantity: item.quantity
            }));

            await OrderService.createOrder(products);
            setSuccess('Order placed successfully!');
            clearCart();

            setTimeout(() => {
                navigate('/orders');
            }, 2000);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                'Failed to place order. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{bgcolor: '#fafbfc', minHeight: '80vh', py: 4, ml: {xs: 0, md: 13},}}>
            <CartHeader />

            {error && <Alert severity="error" sx={{mb: 3}}>{error}</Alert>}
            {success && <Alert severity="success" sx={{mb: 3}}>{success}</Alert>}

            <Container maxWidth="xlg" sx={{
                display: 'flex',
                px: 2,
                width: '100%',
            }}>
                {cart.length > 0 ? (
                    <Grid container spacing={4} sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        flexDirection: {xs: 'column', md: 'row'},
                    }}>
                        <CartList items={cart} />
                        <Grid sx={{
                            maxWidth: {xs: '100%', md: '40%'},
                            borderRadius: 3,
                            boxShadow: '0 2px 16px 0 rgba(0,0,0,0.04)',
                            border: '1px solid #e0e0e0',
                            flex: 1,
                            height: 'fit-content',
                        }}>
                            <OrderSummary
                                total={total}
                                shipping={settings.shipping.flat_rate}
                                taxRate={settings.tax.rate}
                                loading={loading}
                                settingsLoading={settingsLoading}
                                onCheckout={handleCheckout}
                                cartLength={cart.length}
                            />
                        </Grid>
                    </Grid>
                ) : (
                    <EmptyCart />
                )}
            </Container>
        </Box>
    );
};

export default CartPage;
