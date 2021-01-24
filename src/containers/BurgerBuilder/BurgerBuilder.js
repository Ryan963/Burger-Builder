import React, { Component, Fragment, useState } from 'react'
import Burger from '../../components/Burger/Burger'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import orderSummary from '../../components/Burger/OrderSummary/OrderSummary'
const INGREDIENT_PRICES = {
    lettuse: 0.5,
    cheese: 0.5,
    bacon: 1.0,
    meat: 1.5
}
export default class BurgerBuilder extends Component {
    state = {
        ingredients: {
            lettuse: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
    }

    addIngredientHandler(type){
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount < 3 ? oldCount + 1 : oldCount;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice;
        const newPrice = oldCount < 3 ? oldPrice + priceAddition : oldPrice;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler(type){
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount > 0 ? oldCount - 1 : oldCount;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice;
        const newPrice = oldCount > 0 ? oldPrice - priceDeduction : oldPrice;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients)
    }
    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        }).reduce((sum,el) => {
            return sum + el;
        }, 0);
        this.setState({purchaseable: sum > 0})
    }

    purchaseHandler() {
        this.setState({purchasing: true})
    }

    removeCheckoutHandler(){
        this.setState({purchasing: false})
    }

    continueCheckoutHandler(){
        alert('enjoy your burger')
    }

    render(){
        return (
            <Fragment>
                <Modal show={this.state.purchasing}
                 removeCheckout={this.removeCheckoutHandler.bind(this)}>
                    <OrderSummary
                    price = {this.state.totalPrice}
                    purchaseCancelled={this.removeCheckoutHandler.bind(this)}
                    purchaseContinued={this.continueCheckoutHandler.bind(this)}
                    ingredients = {this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                ingredientAdded= {this.addIngredientHandler.bind(this)}
                ingredientRemoved = {this.removeIngredientHandler.bind(this)}
                price = {this.state.totalPrice}
                purchaseable = {this.state.purchaseable}
                ordered = {this.purchaseHandler.bind(this)}
                />

            </Fragment>
        );
    }
}