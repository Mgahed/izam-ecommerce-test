import React from 'react';
import {
    Typography,
    Box,
    Paper,
    Divider,
    Chip
} from '@mui/material';

const OrderStatusInfo = ({ order, formatDate, getStatusColor }) => {
    return (
        <Paper elevation={0} sx={{
            p: 3,
            mb: 3,
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
                    Order Information
                </Typography>
                <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
                    sx={{
                        textTransform: 'capitalize',
                        fontWeight: 600
                    }}
                />
            </Box>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Order Number
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                    #{order.id}
                </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Order Date
                </Typography>
                <Typography variant="body1">
                    {formatDate(order.created_at)}
                </Typography>
            </Box>

            <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Payment Method
                </Typography>
                <Typography variant="body1">
                    {order.payment_method || 'Credit Card'}
                </Typography>
            </Box>
        </Paper>
    );
};

export default OrderStatusInfo;
