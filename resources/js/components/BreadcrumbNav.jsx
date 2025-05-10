import React from 'react';
import { Breadcrumbs, Link, Typography, Box } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const BreadcrumbNav = ({ categoryName }) => {
    return (
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
                    {categoryName || 'All Products'}
                </Typography>
            </Breadcrumbs>
        </Box>
    );
};

export default BreadcrumbNav;
