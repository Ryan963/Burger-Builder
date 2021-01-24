import React, { Component, Fragment } from 'react'
import Button from '../../UI/Button/Button'
export default class orderSummary extends Component {

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(key => {
            return <li key={key}>
                <span style={{textTransform: 'capitalize'}}>{key}</span>
                : {this.props.ingredients[key]}</li>
        })
        return (
            <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: ${this.props.price}</strong></p>
            <p>continue to checkout</p>
            <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued} >CONTINUE</Button>
        </Fragment>
        )
    }
}