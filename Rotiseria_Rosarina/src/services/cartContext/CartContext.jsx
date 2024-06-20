import React, { createContext, useState } from 'react';
import PropType from "prop-types";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  
  const handleDeleteItem = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId))
  }

  const handleIncreaseQuantity = (productId) => {
    setCartItems(cartItems.map(item => 
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecreaseQuantity = (productId) => {
    setCartItems(cartItems.map(item => 
      item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const addToCart = (product) => {
    const isProductInCart = cartItems.some((item) => item.id === product.id);

    if (isProductInCart) {
      alert('El producto ya está en el carrito. Si desea aumentar la cantidad hagalo desde el carrito');
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };


  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        handleDecreaseQuantity,
        handleIncreaseQuantity,
        handleDeleteItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};


CartProvider.propTypes = {
  children: PropType.object,
};