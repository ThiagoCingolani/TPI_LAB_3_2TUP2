import React from 'react';
import { Button } from 'react-bootstrap';
import { CartContext } from '../../services/cartContext/CartContext';

const Cartshop = ({ cart, removeCartItem }) => {
  return (
    <div className="cart-container">
      <Button variant="dark">Carrito ({cart})</Button>
      <div className="cart-items">
        <h2>Carrito de Compras</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              <div>
                <span>{item.name}</span> - <span>${item.price}</span>
                <button onClick={() => removeCartItem(index)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Cartshop;