import React from 'react'
import PropTypes from "prop-types";
import { Card, Row, Col, Button, InputGroup } from 'react-bootstrap'
import "./ProductItem.css"

const ProductItem = ({ id, name, price, category, ingredients, imageUrl }) => {


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
                                <Button variant='primary' className="mr-1 rounded-pill"><img src="https://img.icons8.com/?size=100&id=23175&format=png&color=000000" height={25} width={25}/></Button>
                                <Button variant='success' className="rounded-pill">Comprar</Button>
                            </InputGroup>   
                        </Card.Footer>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
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