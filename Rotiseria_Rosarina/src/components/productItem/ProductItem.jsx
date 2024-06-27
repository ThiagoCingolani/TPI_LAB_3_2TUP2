import React, { useState } from 'react'
import Cart from "../icons/Cart.png"
import { useContext } from 'react';
import PropTypes from "prop-types";
import { Card, Row, Col, Button, InputGroup } from 'react-bootstrap'
import "./ProductItem.css"
import { CartContext } from '../../services/cartContext/CartContext';
import { AuthenticationContext } from '../../services/authentication/Authentication.context';

const ProductItem = ({ id, name, price, ingredients, imageUrl }) => {
    const { addToCart } = useContext(CartContext);
    const { user } = useContext(AuthenticationContext)


    const deleteProduct = async (productId) => {
        if (confirm("¿Estás seguro de que deseas continuar?")) {
            try {
                const response = await fetch(`http://localhost:3001/foods/${productId}`, {
                    method: "DELETE",
                    mode: "cors",
                });

                if (!response.ok) {
                    throw new Error("Fallo al intentar eliminar el producto.");
                }
                alert("Producto eliminado correctamente.");
            }
            catch (error) {
                alert(error);
            }
        }
    };

    const handleAddToCart = () => {
        addToCart({ id, name, price });
    };


    return (
        <Card className='card_group'>
            <Card.Body>
                <Row>
                    <Col md={6}>
                        <Card.Img variant="top" src={imageUrl} height={200} width={250} />
                    </Col>
                    <Col md={6}>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>{ingredients}</Card.Text>
                        <Card.Footer>
                            <h5>${price}</h5>
                            <InputGroup className="input_group">
                                {user.role === "User" &&
                                    <div>
                                        <Button variant='primary' className="mr-1 rounded-pill" onClick={handleAddToCart}><img src={Cart} height={25} width={25} /></Button>
                                        <Button variant='success' className="rounded-pill">Comprar</Button>
                                    </div>
                                }
                                {
                                    user.role === "Admin" &&
                                    <div className='d-flex flex-directions-column' >
                                        <Button variant='danger' className='mr-1 rounded-pill' onClick={() => deleteProduct(id)}>
                                            Eliminar
                                        </Button>
                                        <Button variant='primary' className='mr-1 rounded-pill'>
                                            Modificar
                                        </Button>
                                    </div>
                                }
                            </InputGroup>
                        </Card.Footer>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

ProductItem.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.string,
    ingredients: PropTypes.array,
    imageUrl: PropTypes.string,
};

export default ProductItem
