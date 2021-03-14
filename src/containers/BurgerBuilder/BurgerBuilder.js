import React, { Component, Fragment } from 'react'
import Burger from '../../components/Burger/Burger'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
import {connect} from 'react-redux'
import axios from '../../axiosOrders'
import * as actions from '../../store/actions/index'

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
    }

    componentDidMount() {
        this.props.onInitIngredients()
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        }).reduce((sum,el) => {
            return sum + el;
        }, 0);
        return sum > 0
    }

    purchaseHandler() {
        if (this.props.isAuth){
            this.setState({purchasing: true})
        }
        else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
        
    }
    disableButton(name){
        return this.props.ings[name] < 1
    }

    removeCheckoutHandler(){
        this.setState({purchasing: false})
    }

    continueCheckoutHandler(){
        this.props.onInitPurchase();
        this.props.history.push('/checkout')

    };

    render(){
        let orderSummary = null
        if (this.props.ings){
            orderSummary = (
                <OrderSummary
                    price = {this.props.price}
                    purchaseCancelled={this.removeCheckoutHandler.bind(this)}
                    purchaseContinued={this.continueCheckoutHandler.bind(this)}
                    ingredients = {this.props.ings}/> 
            )
        }
       
        return (
            <Fragment>
                <Modal show={this.state.purchasing}
                 removeCheckout={this.removeCheckoutHandler.bind(this)}>
                    {orderSummary}
                </Modal>
                { this.props.ings ?
                <Fragment>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                    ingredientAdded= {this.props.onIngredientAdded}
                    ingredientRemoved = {this.props.onIngredientRemoved}
                    price = {this.props.price}
                    disable = {this.disableButton.bind(this)}
                    isAuth = {this.props.isAuth}
                    purchaseable = {this.updatePurchaseState(this.props.ings)}
                    ordered = {this.purchaseHandler.bind(this)}
                    />
                </Fragment>
                : <Spinner/>
                }

            </Fragment>
        );
    }
}

const mapDispatchToprops = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
        
    }

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        isAuth: state.auth.token !== null,
    }
}

export default connect(mapStateToProps, mapDispatchToprops)(errorHandler(BurgerBuilder, axios))