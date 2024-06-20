import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Row, Col, FormControl, InputGroup, ListGroup } from 'react-bootstrap';
import { CartContext } from '../../services/cartContext/CartContext';
import "./CartList.css"

const CartList = ({ toggleCart }) => {
    const { cartItems, handleIncreaseQuantity, handleDecreaseQuantity, quantity } = useContext(CartContext);


    return (
        <div className="cart-overlay overflow-auto">
            <div className="cart">
                <h2>Su Carrito</h2>
                <ListGroup className="mt-3">
                    {cartItems.map(item => (
                        <ListGroup.Item key={item.id}>
                                <Row>
                                    {item.name} ${item.price}
                                    <InputGroup className="d-flex">
                                        <Button variant='primary' onClick={() => handleDecreaseQuantity(item.id)}>-</Button>
                                        <FormControl type='input' value={quantity} style={{ width: "50px" }} />
                                        <Button variant='primary' onClick={() => handleIncreaseQuantity(item.id)}>+</Button>
                                    </InputGroup>
                                </Row>
                            </ListGroup.Item>
                    ))}
                </ListGroup>
                    <Button variant="secondary" onClick={toggleCart}>Close</Button>
            </div>
        </div>
    );
};

CartList.propTypes = {
    toggleCart: PropTypes.func,
};

export default CartList;
