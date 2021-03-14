import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'
const controls = [
    {label: 'Lettuse', type: 'lettuse'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]

export default function buildControls(props){
    return (
    <div className= {classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}$</strong></p>
        {controls.map(control => (
        <BuildControl
        disableButton={props.disable(control.type)}
        label={control.label}
         key={control.label}
         added={() => props.ingredientAdded(control.type)}
         removed = {() => props.ingredientRemoved(control.type)}/>
        ))}
        <button 
        disabled={!props.purchaseable}
        className={classes.OrderButton} onClick={props.ordered}>{props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}</button>
    </div>
    )
}

