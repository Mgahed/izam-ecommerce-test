import React from 'react';
import {
    Typography,
    Box,
    Paper,
    Divider,
    Chip
} from '@mui/material';

const OrderSummaryInfo = ({ order, formatDate, getStatusColor }) => {
    // Get values from the order object
    const subtotal = parseFloat(order.subtotal || 0);
    const shipping = parseFloat(order.shipping || 0);
    const tax = parseFloat(order.tax || 0);
    const finalTotal = parseFloat(order.total || 0);

    // Calculate the tax rate percentage for display purposes
    const calculatedTaxRate = subtotal > 0 ? Math.round((tax / subtotal) * 100) : 0;

    return (
        <Paper elevation={0} sx={{
            p: 3,
            borderRadius: 3,
            boxShadow: '0 2px 16px 0 rgba(0,0,0,0.04)',
            border: '1px solid #e0e0e0'
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
                    #{order.id}
                </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Subtotal</Typography>
                <Typography variant="body1">${subtotal.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Shipping</Typography>
                <Typography variant="body1">${shipping.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Tax ({calculatedTaxRate}%)</Typography>
                <Typography variant="body1">${tax.toFixed(2)}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" fontWeight={700}>Total</Typography>
                <Typography variant="h6" fontWeight={700}>${finalTotal.toFixed(2)}</Typography>
            </Box>

            <Box sx={{ mt: 3, p: 2, bgcolor: '#f9f9f9', borderRadius: 2 }}>
                <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
                    Order Status
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip
                        label={order.status}
                        color={getStatusColor(order.status)}
                        sx={{
                            textTransform: 'capitalize',
                            fontWeight: 600
                        }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        Updated: {formatDate(order.updated_at || order.created_at)}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
};

export default OrderSummaryInfo;
