import React from 'react';
import {
    Grid,
    Typography,
    IconButton,
    TextField,
    Card,
    CardContent,
    CardMedia,
    Box,
    Chip
} from '@mui/material';
import {Add, Remove} from '@mui/icons-material';
import { useCart } from '../redux/hooks';

const CartItem = ({item}) => {
    const { updateQuantity, remove } = useCart();

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value >= 1 && value <= (item.stock_quantity || 99)) {
            updateQuantity(item.id, value);
        }
    };

    const handleIncrement = () => {
        if (item.quantity < (item.stock_quantity || 99)) {
            updateQuantity(item.id, item.quantity + 1);
        }
    };

    const handleDecrement = () => {
        if (item.quantity > 1) {
            updateQuantity(item.id, item.quantity - 1);
        }
    };

    const handleRemove = () => {
        remove(item.id);
    }

    const stock = item.stock_quantity !== undefined ? item.stock_quantity : 25;
    const categoryName = item.category?.name || 'T-shirts';

    return (
        <Card elevation={0} sx={{
            display: 'flex',
            mb: 3,
            borderRadius: 3,
            boxShadow: '0 2px 16px 0 rgba(0,0,0,0.04)',
            overflow: 'visible'
        }}>
            <Box sx={{position: 'relative'}}>
                {item.quantity > 0 && (
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 5,
                            right: {xs: 0, md: 10},
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
                        {item.quantity}
                    </Box>
                )}
                <CardMedia
                    component="img"
                    sx={{
                        width: {xs: '164.78px', md: '192px'},
                        height: '100%',
                        maxHeight: {xs: '159.39px', md: '217px'},
                        objectFit: 'cover',
                        m: 1,
                        borderRadius: 2
                    }}
                    image={item.image_path}
                    alt={item.name}
                />
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', flexGrow: 1, p: 2, position: 'relative'}}>
                <IconButton
                    aria-label="delete"
                    onClick={handleRemove}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: '#ff5252'
                    }}
                >
                    <img src="/images/icons/trash.svg" alt="remove"/>
                </IconButton>
                <CardContent sx={{flex: '1 0 auto', p: 0, '&:last-child': {pb: 0}}}>
                    <Box sx={{display: 'flex', alignItems: 'center', mb: {xs: 0.5, md: 7}}}>
                        <Typography component="div" variant="h6" fontWeight={600} sx={{mx: 2.5}}>
                            {item.name}
                            <Chip label={categoryName} size="small" sx={{height: 'auto', ml: {xs: 0, md: 2}}}/>
                        </Typography>
                    </Box>
                    <Typography variant="body1" fontWeight={600} color="text.primary" sx={{mb: 0.5}}>
                        ${item.price}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{display: 'block', mb: 1.5}}>
                        Stock: {stock}
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        border: '1px solid #e0e0e0',
                        borderRadius: 1,
                        height: 36,
                        width: 200,
                        maxWidth: '100%',
                        mt: {xs: 0, md: 3},
                    }}>
                        <IconButton
                            size="small"
                            onClick={handleDecrement}
                            disabled={item.quantity <= 1}
                            sx={{
                                borderRadius: 0,
                                backgroundColor: '#F3F4F6',
                        }}
                        >
                            <Remove fontSize="small"/>
                        </IconButton>
                        <TextField
                            type="text"
                            size="small"
                            value={item.quantity}
                            onChange={handleQuantityChange}
                            inputProps={{
                                min: 1,
                                max: stock,
                                readOnly: true,
                            }}
                            InputProps={{
                                disableUnderline: true,
                            }}
                            variant="standard"
                            sx={{
                                width: '40px',
                                '& input': {textAlign: 'center'},
                                '& .MuiInput-underline:before': {borderBottom: 'none'},
                                '& .MuiInput-underline:after': {borderBottom: 'none'},
                                textAlign: 'center',
                                padding: '0',
                                '& .MuiInput-underline:hover:before': {borderBottom: 'none'},
                            }}
                        />
                        <IconButton
                            size="small"
                            onClick={handleIncrement}
                            disabled={item.quantity >= stock}
                            sx={{borderRadius: 0, backgroundColor: '#F3F4F6'}}
                        >
                            <Add fontSize="small"/>
                        </IconButton>
                    </Box>
                </CardContent>
            </Box>
        </Card>
    );
};

export default CartItem;
