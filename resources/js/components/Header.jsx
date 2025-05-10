import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Badge, IconButton, Box, Container, Link as MuiLink, useMediaQuery, useTheme, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { ShoppingCart, Search as SearchIcon, Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../redux/hooks';

const Header = () => {
    const { logout, isAuthenticated } = useAuth();
    const { itemCount } = useSelector(state => state.cart);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleMenuItemClick = (path) => {
        navigate(path);
        setMobileMenuOpen(false);
    };

    return (
        <>
            {/* Promo Bar */}
            { !isAuthenticated && (
            <Box sx={{ width: '100%', bgcolor: 'black', color: 'white', py: 0.5, textAlign: 'center', fontSize: 14 }}>
                Sign up and get 20% off to your first order.<b> <MuiLink component={Link} to="/register" sx={{ color: 'white', textDecoration: 'underline', fontWeight: 700 }}>Sign Up Now</MuiLink></b>
            </Box>
            )}

            {/* Mobile Menu Drawer */}
            <Drawer
                anchor="left"
                open={mobileMenuOpen}
                onClose={toggleMobileMenu}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: '70%',
                        maxWidth: 300,
                        boxSizing: 'border-box',
                        pt: 2
                    },
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, mb: 2 }}>
                    <IconButton onClick={toggleMobileMenu}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <List>
                    <ListItem button onClick={() => handleMenuItemClick('/')}>
                        <ListItemText primary="Products" />
                    </ListItem>
                    <ListItem button onClick={() => handleMenuItemClick('/sell')}>
                        <ListItemText primary="Sell Your Product" />
                    </ListItem>

                    <Divider sx={{ my: 2 }} />

                    {isAuthenticated ? (
                        <>
                            <ListItem button onClick={() => handleMenuItemClick('/cart')}>
                                <ListItemText primary="Cart" />
                            </ListItem>
                            <ListItem button onClick={() => handleMenuItemClick('/orders')}>
                                <ListItemText primary="My Orders" />
                            </ListItem>
                            <ListItem button onClick={handleLogout}>
                                <ListItemText primary="Logout" />
                            </ListItem>
                        </>
                    ) : (
                        <>
                            <ListItem button onClick={() => handleMenuItemClick('/login')}>
                                <ListItemText primary="Login" />
                            </ListItem>
                            <ListItem button onClick={() => handleMenuItemClick('/register')}>
                                <ListItemText primary="Register" />
                            </ListItem>
                        </>
                    )}
                </List>
            </Drawer>

            {/* Main Header */}
            <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', color: 'black', boxShadow: 'none', borderBottom: '1px solid #eee' }}>
                <Container maxWidth="xlg" disableGutters sx={{
                    mx: { xs: 0, sm: 0 },
                }}>
                    {isMobile ? (
                        /* MOBILE VIEW */
                        <Toolbar sx={{ minHeight: 72, display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1, position: 'relative' }}>
                            <Box sx={{ display: 'flex' }} >
                                {/* Left: Hamburger Menu */}
                                <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleMobileMenu}>
                                    <MenuIcon/>
                                </IconButton>

                                {/* Logo */}
                                <Box
                                    sx={{display: 'flex', alignItems: 'center', textDecoration: 'none'}}
                                    onClick={() => navigate('/')}
                                >
                                    <Box component="img" src="/logo.svg" alt="izam" sx={{height: 30}}/>
                                </Box>
                            </Box>

                            {/* Right: Search, Cart, Auth */}
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                                <IconButton color="inherit">
                                    <SearchIcon />
                                </IconButton>
                                <IconButton component={Link} to="/cart" color="inherit">
                                    <Badge badgeContent={itemCount} color="error" sx={{ '& .MuiBadge-badge': { top: 1, right: 2, fontSize: '0.5rem', minWidth: '13px', height: '13px', padding: '0 4px' } }}>
                                        <img src="/images/icons/cart.svg" alt="cart"/>
                                    </Badge>
                                </IconButton>
                                {isAuthenticated ? (
                                    <Button
                                        onClick={handleLogout}
                                        variant="contained"
                                        sx={{
                                            bgcolor: 'black',
                                            color: 'white',
                                            borderRadius: 1,
                                            px: 1.5,
                                            py: 0.5,
                                            fontWeight: 'bold',
                                            textTransform: 'uppercase',
                                            fontSize: 13,
                                            ml: 1,
                                            '&:hover': { bgcolor: '#333' },
                                            boxShadow: 'none'
                                        }}
                                    >
                                        Logout
                                    </Button>
                                ) : (
                                    <Button
                                        component={Link}
                                        to="/login"
                                        variant="contained"
                                        sx={{
                                            bgcolor: 'black',
                                            color: 'white',
                                            borderRadius: 1,
                                            px: 1.5,
                                            py: 0.5,
                                            fontWeight: 'bold',
                                            textTransform: 'uppercase',
                                            fontSize: 13,
                                            ml: 1,
                                            '&:hover': { bgcolor: '#333' },
                                            boxShadow: 'none'
                                        }}
                                    >
                                        Login
                                    </Button>
                                )}
                            </Box>
                        </Toolbar>
                    ) : (
                        /* DESKTOP VIEW */
                        <Toolbar sx={{ minHeight: 72, display: 'flex', justifyContent: 'space-between', alignItems: 'center', ml: {xs: 0, md: 12} }}>
                            {/* Left: Logo */}
                            <Box
                                sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', cursor: 'pointer' }}
                            >
                                <Box component="img" src="/logo.svg" alt="izam" sx={{ height: 32 }} onClick={() => navigate('/')} />
                                {/* Center: Navigation */}
                                <Button component={Link} to="/" sx={{ color: 'black', fontWeight: 500, textTransform: 'none', fontSize: 16, px: 2, bgcolor: 'transparent' }}>Products</Button>
                                <Button component={Link} to="/sell" variant="contained" sx={{ bgcolor: 'black', color: 'white', borderRadius: 2, boxShadow: 'none', fontWeight: 500, textTransform: 'none', fontSize: 15, px: 2, '&:hover': { bgcolor: '#222' } }}>Sell Your Product</Button>
                            </Box>

                            {/* Right: Cart and Auth */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <IconButton component={Link} to="/cart" sx={{ color: 'black' }}>
                                    <Badge badgeContent={itemCount} color="error" sx={{ '& .MuiBadge-badge': { fontSize: '0.6rem', minWidth: '14px', height: '14px', padding: '0 4px' } }}>
                                        <img src="/images/icons/cart.svg" alt="cart"/>
                                    </Badge>
                                </IconButton>
                                {isAuthenticated ? (
                                    <Button
                                        onClick={handleLogout}
                                        variant="contained"
                                        sx={{ bgcolor: 'black', color: 'white', borderRadius: 2, px: 3, fontWeight: 500, textTransform: 'none', fontSize: 15, ml: 1, '&:hover': { bgcolor: '#222' }, boxShadow: 'none' }}
                                    >
                                        Logout
                                    </Button>
                                ) : (
                                    <Button
                                        component={Link}
                                        to="/login"
                                        variant="contained"
                                        sx={{ bgcolor: 'black', color: 'white', borderRadius: 2, px: 3, fontWeight: 500, textTransform: 'none', fontSize: 15, ml: 1, '&:hover': { bgcolor: '#222' }, boxShadow: 'none' }}
                                    >
                                        Login
                                    </Button>
                                )}
                            </Box>
                        </Toolbar>
                    )}
                </Container>
            </AppBar>
        </>
    );
};

export default Header;
