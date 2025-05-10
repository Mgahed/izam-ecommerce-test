import React, { useState, useEffect } from 'react';
import {
    Container,
    Box,
    Grid,
    CircularProgress,
    Alert,
    Button
} from '@mui/material';
import { useParams, Link as RouterLink } from 'react-router-dom';
import OrderService from '../services/order';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Import new components
import OrderDetailHeader from '../components/order/OrderDetailHeader';
import OrderStatusInfo from '../components/order/OrderStatusInfo';
import OrderSummaryInfo from '../components/order/OrderSummaryInfo';
import OrderProductList from '../components/order/OrderProductList';

const OrderDetailPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchOrderDetails();
    }, [id]);

    const fetchOrderDetails = async () => {
        setLoading(true);
        try {
            const data = await OrderService.getOrder(id);
            setOrder(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching order details:', error);

            // Handle response error properly
            if (error.response) {
                // Server responded with an error status code
                const status = error.response.status;

                if (status === 401) {
                    window.location.href = '/login';
                } else if (status === 403 || status === 404) {
                    setError('Order not found');
                } else {
                    setError(`Error: ${error.response.data.message || 'Failed to load order details'}`);
                }
            } else if (error.request) {
                // Request was made but no response received
                setError('No response from server. Please check your connection and try again.');
            } else {
                // Something else caused the error
                setError('An unexpected error occurred. Please try again later.');
            }

            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'warning';
            case 'processing':
                return 'primary';
            case 'completed':
                return 'success';
            case 'cancelled':
                return 'error';
            default:
                return 'default';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    };

    if (loading) {
        return (
            <Box sx={{ bgcolor: '#fafbfc', minHeight: '80vh', py: 4, ml: { xs: 0, md: 13 } }}>
                <Container maxWidth="xlg">
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                        <CircularProgress />
                    </Box>
                </Container>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ bgcolor: '#fafbfc', minHeight: '80vh', py: 4, ml: { xs: 0, md: 13 } }}>
                <Container maxWidth="xlg">
                    <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
                    <Button
                        component={RouterLink}
                        to="/orders"
                        variant="contained"
                        startIcon={<ArrowBackIcon />}
                        sx={{
                            mt: 2,
                            bgcolor: 'black',
                            color: 'white',
                            borderRadius: 2,
                            fontWeight: 600,
                            fontSize: 16,
                            boxShadow: 'none',
                            '&:hover': { bgcolor: '#222' }
                        }}
                    >
                        Back to Orders
                    </Button>
                </Container>
            </Box>
        );
    }

    if (!order) {
        return (
            <Box sx={{ bgcolor: '#fafbfc', minHeight: '80vh', py: 4, ml: { xs: 0, md: 13 } }}>
                <Container maxWidth="xlg">
                    <Alert severity="info" sx={{ mb: 3 }}>Order not found</Alert>
                    <Button
                        component={RouterLink}
                        to="/orders"
                        variant="contained"
                        startIcon={<ArrowBackIcon />}
                        sx={{
                            mt: 2,
                            bgcolor: 'black',
                            color: 'white',
                            borderRadius: 2,
                            fontWeight: 600,
                            fontSize: 16,
                            boxShadow: 'none',
                            '&:hover': { bgcolor: '#222' }
                        }}
                    >
                        Back to Orders
                    </Button>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{ bgcolor: '#fafbfc', minHeight: '80vh', py: 4, ml: { xs: 0, md: 13 } }}>
            <OrderDetailHeader orderId={order.id} />

            <Container maxWidth="xlg" sx={{
                display: 'flex',
                px: 2,
                width: '100%'
            }}>
                <Grid container spacing={4} sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    flexDirection: { xs: 'column', md: 'row' }
                }}>
                    <Grid sx={{
                        maxWidth: { xs: '100%', md: '60%' },
                        flex: 1,
                        height: 'fit-content'
                    }}>
                        <OrderStatusInfo
                            order={order}
                            formatDate={formatDate}
                            getStatusColor={getStatusColor}
                        />

                        <OrderProductList products={order.products} />
                    </Grid>

                    <Grid sx={{
                        maxWidth: { xs: '100%', md: '40%' },
                        flex: 1,
                        height: 'fit-content'
                    }}>
                        <OrderSummaryInfo
                            order={order}
                            formatDate={formatDate}
                            getStatusColor={getStatusColor}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default OrderDetailPage;
