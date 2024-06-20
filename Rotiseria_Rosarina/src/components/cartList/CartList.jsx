import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Row, Col, FormControl } from 'react-bootstrap';
import '../productItem/ProductItem.css';
import { CartContext } from '../../services/cartContext/CartContext';

const CartList = ({ toggleCart }) => {
    const { cartItems } = useContext(CartContext);


    return (
        <div className="cart-overlay overflow-auto">
            <div className="cart">
                <h2>Cart</h2>
                <ul>
                    {cartItems.map(item => (
                        <Card className="card_group" key={item.id}>
                            <Card.Body>
                                <Row>
                                    <Col md={6}>
                                        <Card.Img variant="top" src={item.imageUrl} height={200} width={250} />
                                    </Col>
                                    <Col md={6}>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>{item.ingredients}</Card.Text>
                                        <Card.Footer>
                                            <h5>${item.price}</h5>
                                            
                                                <Button variant='primary'>-</Button>
                                                <FormControl type='number'/>
                                                <Button variant='primary'>+</Button>
                                        </Card.Footer>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    ))}
                </ul>
                <Button variant="secondary" onClick={toggleCart}>Close</Button>
            </div>
        </div>
    );
};

CartList.propTypes = {
    toggleCart: PropTypes.func,
};

export default CartList;
