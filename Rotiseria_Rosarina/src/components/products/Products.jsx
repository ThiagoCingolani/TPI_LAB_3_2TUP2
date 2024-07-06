import React from 'react'
import PropTypes from "prop-types";
import ProductItem from '../productItem/ProductItem'
import "./Products.css"

const Products = ({ foods, onUpdate }) => {

  return (
    <div className='cardsContainer'>
      {foods.map((food) => {
        const formattedIngredients = food.ingredients.map((ingredient, index) => {
          if (index === food.ingredients.length - 1) {
            return `y ${ingredient}`;
          } else if (index === food.ingredients.length - 2) {
            return `${ingredient} `;
          } else {
            return `${ingredient}, `;
          }
        });
        return (
          <ProductItem
            key={food.id}
            id={Number(food.id)}
            name={food.name}
            price={Number(food.price)}
            category={food.category}
            ingredients={formattedIngredients}
            imageUrl={food.imageUrl}
            onUpdate={onUpdate}
          />
        );
      })}
    </div>
  )
}

Products.propTypes = {
  foods: PropTypes.array,
  onUpdate: PropTypes.func,
};

export default Products