import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Typography,
    Divider,
    IconButton,
    Button,
    TextField,
    CircularProgress
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateCartQuantity, removeFromCart } from '../redux/actions/cartActions';
import ShopService from '../services/shop';

const OrderSummaryPreview = () => {
    const { items: cartItems, total } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState({
        shipping: { flat_rate: 0 },
        tax: { rate: 0 }
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await ShopService.getSettings();
                setSettings(data);
            } catch (error) {
                console.error('Error fetching shop settings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleIncrement = (item) => {
        dispatch(updateCartQuantity(item.id, item.quantity + 1));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateCartQuantity(item.id, item.quantity - 1));
        }
    };

    const handleRemove = (productId) => {
        // First set quantity to 0 in Redux
        const item = cartItems.find(item => item.id === productId);
        if (item) {
            dispatch(updateCartQuantity(productId, 0));
        }
        // Then remove from cart
        dispatch(removeFromCart(productId));
    };

    // Get shipping and tax rates from settings
    const shipping = settings.shipping.flat_rate;
    const taxRate = settings.tax.rate;
    const tax = total * taxRate;
    const finalTotal = total + shipping + tax;

    return (
        <Paper elevation={0}
               sx={{p: 3, borderRadius: 3, boxShadow: '0 2px 16px 0 rgba(0,0,0,0.04)', height: 'fit-content'}}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
                Order Summary
            </Typography>
            <Divider sx={{my: 2}}/>

            {cartItems.length === 0 ? (
                <Typography variant="body2" color="text.secondary" align="center" sx={{py: 4}}>
                    Your cart is empty.
                </Typography>
            ) : (
                <Box sx={{maxHeight: '300px', overflowY: 'auto', pr: 1, mb: 2}}>
                    {cartItems.map(item => (
                        <Box key={item.id} sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                            <Box component="img" src={item.image_path}
                                 alt={item.name} sx={{width: 50, height: 50, borderRadius: 1, mr: 2}}/>
                            <Box sx={{flexGrow: 1}}>
                                <Typography variant="body2" fontWeight={600} sx={{mb: 0.5}}>{item.name}</Typography>
                                <Box
                                    className="quantity-controls"
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: 1,
                                        height: 28,
                                        width: '100px',
                                    }}
                                >
                                    <IconButton
                                        disabled={item.quantity <= 1}
                                        size="small"
                                        onClick={() => handleDecrement(item)}
                                        sx={{borderRadius: 0, backgroundColor: '#F3F4F6'}}
                                    >
                                        <Remove fontSize="small" />
                                    </IconButton>
                                    <TextField
                                        type="text"
                                        size="small"
                                        value={item.quantity}
                                        inputProps={{
                                            min: 1,
                                            readOnly: true,
                                        }}
                                        variant="standard"
                                        sx={{
                                            width: '36px',
                                            '& input': {
                                                textAlign: 'center',
                                            },
                                            '& .MuiInput-underline:before': {
                                                borderBottom: 'none'
                                            },
                                            '& .MuiInput-underline:after': {
                                                borderBottom: 'none'
                                            },
                                            '& .MuiInput-underline:hover:before': {borderBottom: 'none !important'},
                                        }}
                                    />
                                    <IconButton
                                        onClick={() => handleIncrement(item)}
                                        size="small"
                                        sx={{borderRadius: 0, backgroundColor: '#F3F4F6', position: 'relative', right: -2}}
                                    >
                                        <Add fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Box sx={{textAlign: 'right'}}>
                                <IconButton size="small" onClick={() => handleRemove(item.id)}
                                            sx={{color: '#ff5252', p: 0.2, mb: 0.5}}>
                                    <img src="/images/icons/trash.svg" alt="Remove" width={16} height={16}/>
                                </IconButton>
                                <Typography variant="body2" fontWeight={600}>${(item.price * item.quantity).toFixed(2)}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            )}

            <Divider sx={{my: 2}}/>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                    <CircularProgress size={24} />
                </Box>
            ) : (
                <>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 1}}>
                        <Typography variant="body1">Subtotal</Typography>
                        <Typography variant="body1">${total.toFixed(2)}</Typography>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 1}}>
                        <Typography variant="body1">Shipping</Typography>
                        <Typography variant="body1">${shipping.toFixed(2)}</Typography>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 1}}>
                        <Typography variant="body1">Tax ({(taxRate * 100).toFixed(0)}%)</Typography>
                        <Typography variant="body1">${tax.toFixed(2)}</Typography>
                    </Box>
                    <Divider sx={{my: 2}}/>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 3}}>
                        <Typography variant="h6" fontWeight={700}>Total</Typography>
                        <Typography variant="h6" fontWeight={700}>${finalTotal.toFixed(2)}</Typography>
                    </Box>
                </>
            )}
            <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{
                    bgcolor: 'black',
                    color: 'white',
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: 16,
                    boxShadow: 'none',
                    '&:hover': {bgcolor: '#222'}
                }}
                onClick={() => navigate('/cart')}
                disabled={cartItems.length === 0 || loading}
            >
                Proceed to Checkout
            </Button>
        </Paper>
    );
};

export default OrderSummaryPreview;
