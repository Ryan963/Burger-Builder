import React from 'react'
import classes from './Order.module.css'

const order = props => {
    const ingredients = []
    for (let ing in props.ingredients){
        ingredients.push({name: ing,amount: props.ingredients[ing]})
    }
    const ingStyles = {textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px'
    }
    const ingredientsOutput = ingredients.map(ingredient => {
        return <span key = {ingredient.name}
        style={ingStyles}
        >{ingredient.name} ({ingredient.amount})</span>
    })
    return(
    <div className= {classes.Order}>
        <p>Ingredients: {ingredientsOutput}</p>
        <p>Price: <strong>${props.price.toFixed(2)}</strong></p>
    </div>
    )
}

export default order