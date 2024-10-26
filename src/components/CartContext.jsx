import React, { createContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prev) => {
            const existingItem = prev.find(item => item.id === product.id);
            if (existingItem) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (id, quantity) => {
        if (quantity > 0) {
            setCart((prev) =>
                prev.map(item =>
                    item.id === id ? { ...item, quantity } : item
                )
            );
        } else {
            setCart((prev) => prev.filter(item => item.id !== id));
        }
    };

    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, totalAmount, totalQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return React.useContext(CartContext);
};
