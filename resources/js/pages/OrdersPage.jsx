import React, { useState, useEffect } from 'react';
import {
    Container,
    Box,
    CircularProgress,
    Alert,
    Pagination
} from '@mui/material';
import OrderService from '../services/order';

// Import new components
import OrdersHeader from '../components/order/OrdersHeader';
import OrdersTable from '../components/order/OrdersTable';
import OrdersMobileList from '../components/order/OrdersMobileList';
import EmptyOrders from '../components/order/EmptyOrders';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        perPage: 10,
        total: 0
    });

    useEffect(() => {
        fetchOrders(pagination.currentPage);
    }, [pagination.currentPage]);

    const fetchOrders = async (page = 1) => {
        setLoading(true);
        try {
            const response = await OrderService.getOrders(page);
            // Handle the response format correctly
            setOrders(response.data || []);
            setPagination({
                currentPage: response.current_page || 1,
                totalPages: response.last_page || 1,
                perPage: response.per_page || 10,
                total: response.total || 0
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError('Failed to load orders. Please try again later.');
            setLoading(false);
        }
    };

    const handlePageChange = (event, value) => {
        setPagination(prev => ({
            ...prev,
            currentPage: value
        }));
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
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
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
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{ bgcolor: '#fafbfc', minHeight: '80vh', py: 4, ml: { xs: 0, md: 13 } }}>
            <OrdersHeader />

            <Container maxWidth="xlg">
                {orders.length > 0 ? (
                    <>
                        <OrdersTable
                            orders={orders}
                            formatDate={formatDate}
                            getStatusColor={getStatusColor}
                        />

                        <OrdersMobileList
                            orders={orders}
                            formatDate={formatDate}
                            getStatusColor={getStatusColor}
                        />

                        {pagination.totalPages > 1 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                <Pagination
                                    count={pagination.totalPages}
                                    page={pagination.currentPage}
                                    onChange={handlePageChange}
                                    color="primary"
                                    shape="rounded"
                                    showFirstButton
                                    showLastButton
                                    sx={{
                                        '& .MuiPaginationItem-root': {
                                            borderRadius: 2,
                                            '&.Mui-selected': {
                                                bgcolor: 'black',
                                                color: 'white',
                                                '&:hover': {
                                                    bgcolor: '#333',
                                                }
                                            }
                                        }
                                    }}
                                />
                            </Box>
                        )}
                    </>
                ) : (
                    <EmptyOrders />
                )}
            </Container>
        </Box>
    );
};

export default OrdersPage;
