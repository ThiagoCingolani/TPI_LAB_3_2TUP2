import React from 'react'
import PropTypes from "prop-types";
import "./ProductItem.css"
import Kart from "../icons/Kart.png"

import { Card, Button } from 'react-bootstrap'

const ProductItem = ({name, price, ingredients, imageUrl }) => {


    return (
        <Card className='card_group'>
            <Card.Img variant="top" src={imageUrl} height={250} width={250} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{ingredients}</Card.Text>
            </Card.Body>
            <Card.Subtitle>${price}</Card.Subtitle>
            <Button><img src={Kart} height={20} alt="icono"/></Button>
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