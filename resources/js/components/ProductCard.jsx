import React, {useState, useEffect} from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardActions,
    TextField,
    Box,
    IconButton,
    Badge, Chip, Grid
} from '@mui/material';
import {Add, Remove} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart as addToCartAction, updateCartQuantity, removeFromCart} from '../redux/actions/cartActions';

const ProductCard = ({product, onProductClick}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const [quantity, setQuantity] = useState(0);

    // Check if product is already in cart and get its quantity
    const cartItem = cartItems.find(item => item.id === product.id);

    // Initialize quantity state from cart if product exists in cart
    useEffect(() => {
        if (cartItem) {
            setQuantity(cartItem.quantity);
        } else {
            // Reset quantity to 0 when item is removed from cart
            setQuantity(0);
        }
    }, [cartItem]);

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value >= 0 && value <= product.stock_quantity) {
            setQuantity(value);
            updateCart(value);
        }
    };

    const handleIncrement = () => {
        const newQuantity = quantity + 1;
        if (newQuantity <= product.stock_quantity) {
            setQuantity(newQuantity);
            updateCart(newQuantity);
        }
    };

    const handleDecrement = () => {
        const newQuantity = quantity - 1;
        if (newQuantity >= 0) {
            setQuantity(newQuantity);
            updateCart(newQuantity);
        }
    };

    const updateCart = (newQuantity) => {
        if (newQuantity === 0) {
            // Remove from cart if quantity is 0
            if (cartItem) {
                dispatch(removeFromCart(product.id));
            }
        } else if (cartItem) {
            // Update quantity if product is already in cart
            dispatch(updateCartQuantity(product.id, newQuantity));
        } else {
            // Add to cart if product is not in cart
            dispatch(addToCartAction(product, newQuantity));
        }
    };

    const handleCardClick = (e) => {
        // Prevent opening drawer when clicking on quantity controls
        if (e.target.closest('.quantity-controls')) {
            return;
        }

        // Open the product details drawer
        if (onProductClick) {
            onProductClick(product);
        }
    };

    return (

        <Card
            elevation={0}
            sx={{
                width: {xs: '100%', sm: '100%'},
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 2px 16px 0 rgba(0,0,0,0.04)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 10px 25px 0 rgba(0,0,0,0.08)',
                }
            }}
            onClick={handleCardClick}
        >
            <Box sx={{position: 'relative'}}>
                {quantity > 0 && (
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: {xs: 0, md: 10},
                            right: {xs: 2, md: 10},
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
                        {quantity}
                    </Box>
                )}
                <CardMedia
                    component="img"
                    image={product.image_path}
                    alt={product.name}
                    sx={{
                        objectFit: 'contain',
                        width: {xs: '264.66px', md: '100%'},
                        height: {xs: '164.78px', md: '159.39px'},
                        maxHeight: '100%',
                    }}
                />
            </Box>
            <CardContent sx={{flexGrow: 1, p: 3}}>
                <Box sx={{
                    mb: 1,
                    display: {xs: 'grid', md: 'flex'},
                    justifyContent: {xs: 'none', md: 'space-between'},
                }}>
                    <Typography variant="h6" component="div" fontWeight={500} sx={{mb: 1, fontSize:{xs: '12px', md: '16px'}}}>
                        {product.name}
                    </Typography>
                    <Box sx={{mb: 2, minHeight: '40px'}}>
                        <Chip label={product.category ? product.category.name : 'T-shirts'} sx={{height: 'auto', ml: {xs: 0, md: 2}, fontWeight: 400, fontSize: {xs: '10px', md: '12px'}}}/>
                    </Box>
                </Box>

                <Box sx={{display: {
                    xs: 'grid', sm:'flex', md: 'flex'
                },
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1
                }}>
                    <Typography variant="h6" sx={{fontWeight: 700, color: 'black', fontSize: {xs: '14px', md: '16px'}}}>
                        ${product.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Stock: {product.stock_quantity}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions sx={{p: 2, pt: 0, width: {xs: '100%', md: '60%'}}}>
                <Box
                    className="quantity-controls"
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        border: '1px solid #e0e0e0',
                        borderRadius: 1,
                        height: 36,
                        width: '100%',
                        maxWidth: '100%'
                    }}
                >
                    <IconButton
                        disabled={quantity <= 0}
                        size="small"
                        onClick={handleDecrement}
                        sx={{borderRadius: 0, backgroundColor: '#F3F4F6'}}
                    >
                        <Remove fontSize="small"/>
                    </IconButton>
                    <TextField
                        type="text"
                        size="small"
                        value={quantity}
                        onChange={handleQuantityChange}
                        inputProps={{
                            min: 0,
                            max: product.stock_quantity,
                            readOnly: true,
                        }}
                        variant="standard"
                        sx={{
                            width: '40px',
                            '& input': {
                                textAlign: 'center',
                            },
                            '& .MuiInput-underline:before': {
                                borderBottom: 'none'
                            },
                            '& .MuiInput-underline:after': {
                                borderBottom: 'none'
                            },
                            '& .MuiInput-underline:hover:before': {borderBottom: 'none !important'},
                        }}
                    />
                    <IconButton
                        disabled={quantity >= product.stock_quantity}
                        onClick={handleIncrement}
                        size="small"
                        sx={{borderRadius: 0, backgroundColor: '#F3F4F6'}}
                    >
                        <Add fontSize="small"/>
                    </IconButton>
                </Box>
            </CardActions>
        </Card>
    );
};

export default ProductCard;
