import { array } from 'prop-types';
import React from 'react';
import classes from './Burger.module.css'
import Ingredients from './Ingrediants/Ingrediants'
const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
    .map(key => {
        return [...Array(props.ingredients[key])].map((_, i) => {
            return <Ingredients key = {key + i} type={key}/>
        })
    }).reduce((arr,el) => arr.concat(el), []);
    if (!transformedIngredients.length){
        transformedIngredients = <p>Please start adding ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <Ingredients type={'bread-top'}/>
            {transformedIngredients}
            <Ingredients type={'bread-bottom'}/>
        </div>
    )
}

export default burger;