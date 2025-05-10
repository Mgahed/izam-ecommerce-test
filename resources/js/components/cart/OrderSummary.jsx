import React from 'react';
import {
    Typography,
    Box,
    Button,
    Paper,
    Divider,
    CircularProgress
} from '@mui/material';

const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

const OrderSummary = ({
    total,
    shipping,
    taxRate,
    loading,
    settingsLoading,
    onCheckout,
    cartLength
}) => {
    const tax = total * taxRate;
    const finalTotal = total + shipping + tax;
    const orderDate = new Date();

    return (
        <Paper elevation={0}
            sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: '0 2px 16px 0 rgba(0,0,0,0.04)',
            }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2
            }}>
                <Typography variant="h6" fontWeight={700}>
                    Order Summary
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {formatDate(orderDate)}
                </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            {settingsLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                    <CircularProgress size={24} />
                </Box>
            ) : (
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body1">Subtotal</Typography>
                        <Typography variant="body1">${total.toFixed(2)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body1">Shipping</Typography>
                        <Typography variant="body1">${shipping.toFixed(2)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body1">Tax ({(taxRate * 100).toFixed(0)}%)</Typography>
                        <Typography variant="body1">${tax.toFixed(2)}</Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
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
                    '&:hover': { bgcolor: '#222' }
                }}
                onClick={onCheckout}
                disabled={loading || settingsLoading || cartLength === 0}
            >
                {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Place the order'}
            </Button>
        </Paper>
    );
};

export default OrderSummary;
