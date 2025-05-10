import React from 'react';
import { Typography, Box, Breadcrumbs, Link, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const OrdersHeader = () => {
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
                    <Typography color="text.primary" sx={{ fontWeight: 500 }}>
                        Orders
                    </Typography>
                </Breadcrumbs>
            </Box>

            <Typography variant="h4" component="h1" fontWeight={700} sx={{ mb: 4 }}>
                Your Orders
            </Typography>
        </Container>
    );
};

export default OrdersHeader;
