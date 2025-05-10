import React from 'react';
import {
    Typography,
    Box,
    Breadcrumbs,
    Link,
    Button,
    Container
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const OrderDetailHeader = ({ orderId }) => {
    return (
        <Container maxWidth="xlg">
            <Box sx={{ mb: 4 }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                        component={RouterLink}
                        to="/"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: 'text.secondary',
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' }
                        }}
                    >
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Home
                    </Link>
                    <Link
                        component={RouterLink}
                        to="/orders"
                        sx={{
                            color: 'text.secondary',
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' }
                        }}
                    >
                        Orders
                    </Link>
                    <Typography color="text.primary" sx={{ fontWeight: 500 }}>
                        Order #{orderId}
                    </Typography>
                </Breadcrumbs>
            </Box>

            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4" component="h1" fontWeight={700}>
                    Order Details
                </Typography>
                <Button
                    component={RouterLink}
                    to="/orders"
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    sx={{
                        borderColor: 'black',
                        color: 'black',
                        borderRadius: 2,
                        '&:hover': { borderColor: 'black', bgcolor: 'rgba(0,0,0,0.04)' }
                    }}
                >
                    Back to Orders
                </Button>
            </Box>
        </Container>
    );
};

export default OrderDetailHeader;
