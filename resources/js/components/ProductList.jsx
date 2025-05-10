import React from 'react';
import { Box, Grid, Typography, Paper, CircularProgress, Button } from '@mui/material';
import ProductCard from './ProductCard';

const ProductList = ({
    products,
    loading,
    totalPages,
    page,
    paginationLinks,
    onPageChange,
    onProductClick,
    productsCount,
    categoryName
}) => {
    return (
        <>
            <Box sx={{
                display: 'flex',
                mb: 3,
                flexDirection: 'column',
            }}>
                <Typography variant="h4" component="h1" fontWeight={700} sx={{mb: 4}}>
                    {categoryName || 'Casual'}
                </Typography>
                <Typography variant="body2" color="text.secondary"
                            sx={{display: {xs: 'none', sm: 'block'}}}>
                    Showing 1-{products.length} of {productsCount} Products
                </Typography>
            </Box>

            {loading ? (
                <Box sx={{display: 'flex', justifyContent: 'center', py: 5}}>
                    <CircularProgress/>
                </Box>
            ) : products.length > 0 ? (
                <Grid container spacing={{ xs: 1, md: 3 }}>
                    {products.map((product) => (
                        <Grid key={product.id} mb={2} size={{ xs: 6, sm: 6, md: 4}}>
                            <ProductCard product={product} onProductClick={onProductClick}/>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Paper elevation={0} sx={{
                    p: 5,
                    textAlign: 'center',
                    borderRadius: 3,
                    boxShadow: '0 2px 16px 0 rgba(0,0,0,0.04)'
                }}>
                    <Typography variant="h6">No products found.</Typography>
                    <Typography variant="body1" color="text.secondary" sx={{mt: 1}}>
                        Try adjusting your filters or search query.
                    </Typography>
                </Paper>
            )}

            {/* Custom Pagination */}
            {totalPages > 1 && (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 4,
                    p: 2,
                    borderRadius: 2
                }}>
                    <Button
                        onClick={() => onPageChange(null, page - 1)}
                        disabled={page === 1}
                        sx={{
                            color: page === 1 ? 'text.disabled' : 'text.primary',
                            minWidth: 'auto',
                            p: 1,
                            mr: 1,
                            fontSize: '14px',
                            '&:hover': {bgcolor: 'transparent', color: 'primary.main'}
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                             strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6"/>
                        </svg>
                        Previous
                    </Button>

                    <Box sx={{
                        display: {xs: 'none', md: 'flex'},
                    }}>
                        {paginationLinks
                            .filter(link =>
                                !link.label.includes('Previous') &&
                                !link.label.includes('Next')
                            )
                            .map((link, index) => {
                                // If it's an ellipsis, render it as is
                                if (link.label === '...') {
                                    return (
                                        <Box
                                            key={`ellipsis-${index}`}
                                            sx={{
                                                mx: 1,
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Typography variant="body2">...</Typography>
                                        </Box>
                                    );
                                }

                                // Parse the page number from the label
                                const pageNum = parseInt(link.label);

                                return (
                                    <Box
                                        key={`page-${link.label}`}
                                        onClick={() => onPageChange(null, pageNum)}
                                        sx={{
                                            width: '30px',
                                            height: '30px',
                                            borderRadius: '5px',
                                            bgcolor: link.active ? 'black' : 'transparent',
                                            color: link.active ? 'white' : 'text.primary',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mx: 0.5,
                                            cursor: 'pointer',
                                            fontWeight: link.active ? 'bold' : 'normal',
                                            '&:hover': {
                                                bgcolor: link.active ? 'black' : '#f5f5f5'
                                            }
                                        }}
                                    >
                                        <Typography variant="body2">{link.label}</Typography>
                                    </Box>
                                );
                            })}
                    </Box>
                    <Button
                        onClick={() => onPageChange(null, page + 1)}
                        disabled={page === totalPages}
                        sx={{
                            color: page === totalPages ? 'text.disabled' : 'text.primary',
                            minWidth: 'auto',
                            p: 1,
                            ml: 1,
                            fontSize: '14px',
                            '&:hover': {bgcolor: 'transparent', color: 'primary.main'}
                        }}
                    >
                        Next
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                             strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6"/>
                        </svg>
                    </Button>
                </Box>
            )}
        </>
    );
};

export default ProductList;
