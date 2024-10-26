import React from 'react';
import { CartProvider } from './components/CartContext';
import Cart from './components/Cart';
import productsData from './data/products.json'; // Import your products
import { Button, Container, Grid, Typography } from '@mui/material';
import { useCart } from './components/CartContext';

const App = () => {
    return (
        <CartProvider>
            <MainContent />
        </CartProvider>
    );
};

const MainContent = () => {
    const { addToCart } = useCart(); // Moved here to ensure it is within the provider

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Product List
            </Typography>
            <Cart />
            <Grid container spacing={2}>
                {productsData.products.map(product => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <div>
                            <Typography variant="h6">{product.title}</Typography>
                            <img src={product.image} alt={product.title} width="100" height="150"/>
                            <Typography>Price: ${product.price.toFixed(2)}</Typography>
                            <Button variant="contained" onClick={() => addToCart(product)}>
                                Add to Cart
                            </Button>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default App;
