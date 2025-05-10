import React from 'react';
import {
    Box,
    Paper,
    Typography,
    Chip,
    Button
} from '@mui/material';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';

const OrdersMobileList = ({ orders, formatDate, getStatusColor }) => {
    return (
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            {orders.map((order) => (
                <Paper
                    key={order.id}
                    elevation={0}
                    sx={{
                        mb: 2,
                        p: 2,
                        borderRadius: 3,
                        boxShadow: '0 2px 16px 0 rgba(0,0,0,0.04)',
                        border: '1px solid #e0e0e0'
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography fontWeight={700}>Order #{order.id}</Typography>
                        <Chip
                            label={order.status}
                            color={getStatusColor(order.status)}
                            size="small"
                            sx={{
                                textTransform: 'capitalize',
                                fontWeight: 500
                            }}
                        />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                            Date
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                            {formatDate(order.created_at)}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', mb: 2 }}>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                Total
                            </Typography>
                            <Typography variant="body1" fontWeight={700}>
                                ${parseFloat(order.total).toFixed(2)}
                            </Typography>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                Items
                            </Typography>
                            <Typography variant="body1">
                                {order.products.length} items
                            </Typography>
                        </Box>
                    </Box>

                    <Button
                        component={Link}
                        to={`/orders/${order.id}`}
                        variant="contained"
                        fullWidth
                        startIcon={<VisibilityIcon />}
                        sx={{
                            mt: 1,
                            bgcolor: 'black',
                            color: 'white',
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 500,
                            boxShadow: 'none',
                            '&:hover': { bgcolor: '#333' }
                        }}
                    >
                        View Order Details
                    </Button>
                </Paper>
            ))}
        </Box>
    );
};

export default OrdersMobileList;
