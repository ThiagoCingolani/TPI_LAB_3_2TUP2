import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Row, Col, FormControl, InputGroup, ListGroup, CloseButton } from 'react-bootstrap';
import { CartContext } from '../../services/cartContext/CartContext';
import "./CartList.css"

const CartList = ({ toggleCart }) => {
    const { cartItems, handleIncreaseQuantity, handleDecreaseQuantity, handleDeleteItem } = useContext(CartContext);


    return (
        <div className="cart-overlay overflow-auto">
            <div className="cart">
                <h2>Su Carrito</h2>
                <ListGroup className="mt-3">
                    {cartItems.map(item => (
                        <ListGroup.Item key={item.id}>
                            <Row>
                                <Col>{item.name} ${item.price * item.quantity}
                                    <CloseButton style={{ marginLeft: '1rem' }} onClick={() => handleDeleteItem(item.id)}/>
                                </Col>
                                <InputGroup className="d-flex">
                                    <Button variant='primary' onClick={() => handleDecreaseQuantity(item.id)}>-</Button>
                                    <FormControl type='input' value={item.quantity} style={{ width: "50px", textAlign: 'center' }} readOnly />
                                    <Button variant='primary' onClick={() => handleIncreaseQuantity(item.id)}>+</Button>
                                </InputGroup>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <h1>Precio total: ${ }</h1>
                <Button variant="secondary" onClick={toggleCart}>Close</Button>
            </div>
        </div>
    );
};

CartList.propTypes = {
    toggleCart: PropTypes.func,
};

export default CartList;
