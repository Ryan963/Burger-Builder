import React from 'react';
import classes from './Burger.module.css'
import Ingredients from './Ingrediants/Ingrediants'
const burger = (props) => {
    let objectKeys = Object.keys(props.ingredients)
    let transformedIngredients = []
    for (let key of objectKeys){
        if (props.ingredients[key] > 0){
            for (let i = 0; i < props.ingredients[key]; i++){
                transformedIngredients.push(<Ingredients key = {key + i} type={key}/>)
            }
        }
    }
    
    return (
        <div className={classes.Burger}>
            <Ingredients type={'bread-top'}/>
            {transformedIngredients.length 
            ? transformedIngredients.map(ing => ing)
            : <p>Please start adding ingredients</p>
        }
            <Ingredients type={'bread-bottom'}/>
        </div>
    )
}

export default burger;