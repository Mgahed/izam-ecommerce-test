import React from 'react';
import {
    Typography,
    Box,
    Paper,
    Divider,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Alert
} from '@mui/material';

const OrderProductList = ({ products }) => {
    if (!products || products.length === 0) {
        return (
            <Alert severity="info" sx={{ mb: 2 }}>No products in this order.</Alert>
        );
    }

    return (
        <>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2, pl: 1 }}>
                Items
            </Typography>

            {products.map((product) => (
                <Card key={product.id} elevation={0} sx={{
                    display: 'flex',
                    mb: 2,
                    borderRadius: 3,
                    boxShadow: '0 2px 16px 0 rgba(0,0,0,0.04)',
                    border: '1px solid #e0e0e0',
                    overflow: 'visible'
                }}>
                    <Box sx={{ position: 'relative' }}>
                        {product.pivot?.quantity > 0 && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 10,
                                    right: { xs: 0, md: 10 },
                                    zIndex: 2,
                                    width: 32,
                                    height: 32,
                                    borderRadius: '50%',
                                    bgcolor: '#2563EB',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    fontSize: '14px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                }}
                            >
                                {product.pivot?.quantity}
                            </Box>
                        )}
                        <CardMedia
                            component="img"
                            sx={{
                                width: { xs: '164.78px', md: '192px' },
                                height: { xs: '159.39px', md: '217px' },
                                objectFit: 'cover',
                                m: 1,
                                borderRadius: 2
                            }}
                            image={product.image_path || `https://via.placeholder.com/192x217?text=${product.name}`}
                            alt={product.name || 'Product'}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, p: 2 }}>
                        <CardContent sx={{ flex: '1 0 auto', p: 0, '&:last-child': { pb: 0 } }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                <Typography component="div" variant="h6" fontWeight={600} sx={{ mr: 1 }}>
                                    {product.name || 'Product'}
                                    <Chip
                                        label={product.category?.name || 'Uncategorized'}
                                        size="small"
                                        sx={{ height: 'auto', ml: { xs: 0, md: 2 } }}
                                    />
                                </Typography>
                            </Box>
                            <Typography variant="body1" fontWeight={600} color="text.primary" sx={{ mb: 2 }}>
                                ${parseFloat(product.pivot?.price || 0).toFixed(2)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Quantity: {product.pivot?.quantity || 0}
                            </Typography>
                            <Typography variant="body1" fontWeight={700} sx={{ mt: 2 }}>
                                Subtotal: ${(parseFloat(product.pivot?.price || 0) * parseInt(product.pivot?.quantity || 0)).toFixed(2)}
                            </Typography>
                        </CardContent>
                    </Box>
                </Card>
            ))}
        </>
    );
};

export default OrderProductList;
