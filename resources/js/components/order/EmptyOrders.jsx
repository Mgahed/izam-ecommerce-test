import React from 'react';
import { Typography, Paper, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const EmptyOrders = () => {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 4,
                textAlign: 'center',
                borderRadius: 3,
                boxShadow: '0 2px 16px 0 rgba(0,0,0,0.04)',
                border: '1px solid #e0e0e0'
            }}
        >
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <ShoppingBagIcon sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
                <Typography variant="h6" gutterBottom fontWeight={500}>
                    No Orders Yet
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    You haven't placed any orders yet. Start shopping to see your orders here.
                </Typography>
                <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    sx={{
                        bgcolor: 'black',
                        color: 'white',
                        borderRadius: 2,
                        fontWeight: 600,
                        boxShadow: 'none',
                        '&:hover': { bgcolor: '#222' }
                    }}
                >
                    Start Shopping
                </Button>
            </Box>
        </Paper>
    );
};

export default EmptyOrders;
