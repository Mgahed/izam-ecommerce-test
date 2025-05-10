import React from 'react';
import { Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EmptyCart = () => {
    const navigate = useNavigate();

    return (
        <Paper
            sx={{
                p: 4,
                textAlign: 'center',
                borderRadius: 3,
                boxShadow: '0 2px 16px 0 rgba(0,0,0,0.04)',
                width: '100%'
            }}
        >
            <Typography variant="h6" gutterBottom>
                Your cart is empty
            </Typography>
            <Button
                variant="contained"
                onClick={() => navigate('/')}
                sx={{
                    bgcolor: 'black',
                    color: 'white',
                    borderRadius: 2,
                    fontWeight: 600,
                    '&:hover': { bgcolor: '#222' }
                }}
            >
                Continue Shopping
            </Button>
        </Paper>
    );
};

export default EmptyCart;
