import React from 'react';
import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Chip,
    Box
} from '@mui/material';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';

const OrdersTable = ({ orders, formatDate, getStatusColor }) => {
    return (
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <TableContainer component={Paper} elevation={0} sx={{
                mt: 3,
                borderRadius: 3,
                boxShadow: '0 2px 16px 0 rgba(0,0,0,0.04)',
                border: '1px solid #e0e0e0',
                overflow: 'hidden'
            }}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                            <TableCell sx={{ fontWeight: 600 }}>Order #</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Total</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Items</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id} hover>
                                <TableCell sx={{ fontWeight: 600 }}>#{order.id}</TableCell>
                                <TableCell>{formatDate(order.created_at)}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={order.status}
                                        color={getStatusColor(order.status)}
                                        size="small"
                                        sx={{
                                            textTransform: 'capitalize',
                                            fontWeight: 500
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>${parseFloat(order.total).toFixed(2)}</TableCell>
                                <TableCell>{order.products.length} items</TableCell>
                                <TableCell align="right">
                                    <Button
                                        component={Link}
                                        to={`/orders/${order.id}`}
                                        variant="contained"
                                        size="small"
                                        startIcon={<VisibilityIcon />}
                                        sx={{
                                            bgcolor: 'black',
                                            color: 'white',
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            fontWeight: 500,
                                            boxShadow: 'none',
                                            '&:hover': { bgcolor: '#333' }
                                        }}
                                    >
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default OrdersTable;
