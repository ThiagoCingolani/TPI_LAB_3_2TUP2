import React, { useState } from 'react'
import Cart from "../icons/Cart.png"
import useModal from '../hooks/useModal.jsx'
import { useContext } from 'react';
import PropTypes from "prop-types";
import { Card, Row, Col, Button, InputGroup, Modal, Form } from 'react-bootstrap'
import "./ProductItem.css"
import { CartContext } from '../../services/cartContext/CartContext';
import { AuthenticationContext } from '../../services/authentication/Authentication.context';

const ProductItem = ({ id, name, price, ingredients, imageUrl, category, onUpdate }) => {
    const { isOpenUpdateProduct, toggleUpdateProduct } = useModal()
    const { addToCart } = useContext(CartContext);
    const { user } = useContext(AuthenticationContext)
    const [productName, setProductName] = useState(name);
    const [productPrice, setProductPrice] = useState(price);
    const [productIngredients, setProductIngredients] = useState(ingredients);
    const [productImageUrl, setProductImageUrl] = useState(imageUrl);
    const [productCategory, setProductCategory] = useState(category)

    const handleApplyChanges = async () => {
        const updatedProductData = {
            id,
            name: productName,
            price: productPrice,
            category: productCategory,
            ingredients: productIngredients,
            imageUrl: productImageUrl,
        };

        try {
            const response = await fetch(`http://localhost:3001/foods/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProductData),
            });

            if (!response.ok) {
                throw new Error('Failed to update product.');
            }

            onUpdate(updatedProductData);
            toggleUpdateProduct();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

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
                                        <Button variant='primary' className='mr-1 rounded-pill' onClick={toggleUpdateProduct}>
                                            Modificar
                                        </Button>
                                    </div>
                                }
                            </InputGroup>
                        </Card.Footer>
                    </Col>
                </Row>
            </Card.Body>



            {/* Modal para modificar producto */}
            <Modal show={isOpenUpdateProduct} onHide={toggleUpdateProduct}>
                <Modal.Header closeButton>
                    <Modal.Title>Modificar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre del Producto</Form.Label>
                            <Form.Control
                                type="text"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                value={productPrice}
                                onChange={(e) => setProductPrice(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Control
                                type="text"
                                value={productCategory}
                                onChange={(e) => setProductCategory(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ingredientes</Form.Label>
                            <Form.Control
                                type="text"
                                value={productIngredients.join(', ')}
                                onChange={(e) => setProductIngredients(e.target.value.split(',').map(ingredient => ingredient.trim()))}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>URL de imagen</Form.Label>
                            <Form.Control
                                type="text"
                                value={productImageUrl}
                                onChange={(e) => setProductImageUrl(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleUpdateProduct}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleApplyChanges}>
                        Aplicar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>
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
    onUpdate: PropTypes.func,
};

export default ProductItem
