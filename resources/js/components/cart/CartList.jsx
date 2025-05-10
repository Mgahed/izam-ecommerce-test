import React from 'react';
import { Grid } from '@mui/material';
import CartItem from '../CartItem';

const CartList = ({ items }) => {
    return (
        <Grid sx={{
            maxWidth: { xs: '100%', md: '60%' },
            borderRadius: 3,
            boxShadow: '0 2px 16px 0 rgba(0,0,0,0.04)',
            border: '1px solid #e0e0e0',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'space-between',
            height: 'fit-content',
        }}>
            {items.map(item => (
                <CartItem key={item.id} item={item} />
            ))}
        </Grid>
    );
};

export default CartList;
