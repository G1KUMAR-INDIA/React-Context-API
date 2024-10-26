import React from 'react';
import { useCart } from './CartContext';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';

const Cart = () => {
    const { cart, updateQuantity, totalAmount, totalQuantity } = useCart();

    const handleQuantityChange = (id, delta) => {
        const item = cart.find(item => item.id === id);
        updateQuantity(id, item.quantity + delta);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart.map(item => (
                        <TableRow key={item.id}>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>${item.price.toFixed(2)}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleQuantityChange(item.id, -1)}>-</Button>
                                {item.quantity}
                                <Button onClick={() => handleQuantityChange(item.id, 1)}>+</Button>
                            </TableCell>
                            <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Typography variant="h6">Total Quantity: {totalQuantity}</Typography>
            <Typography variant="h6">Total Amount: ${totalAmount.toFixed(2)}</Typography>
        </TableContainer>
    );
};

export default Cart;
