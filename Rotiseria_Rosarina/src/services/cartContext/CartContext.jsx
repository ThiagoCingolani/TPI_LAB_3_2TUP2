import React, { createContext, useState } from 'react';
import PropType from "prop-types";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = (product) => {
    const isProductInCart = cartItems.some((item) => item.id === product.id);

    if (isProductInCart) {
      alert('El producto ya está en el carrito.');
    } else {
      setCartItems([...cartItems, product]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };


  return (
    <CartContext.Provider
      value={{
        cartItems,
        quantity,
        addToCart,
        removeFromCart,
        handleDecreaseQuantity,
        handleIncreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};


CartProvider.propTypes = {
  children: PropType.object,
};

