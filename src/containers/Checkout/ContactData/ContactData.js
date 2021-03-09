import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import {connect} from 'react-redux'
import axios from '../../../axiosOrders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import ErrorHandler from '../../../hoc/ErrorHandler/ErrorHandler'
import * as actions from '../../../store/actions/index'

const createInputForm = (value, placeholder, elementType, type, required, minLength, maxLength) => {
    return {
                elementType,
                elementConfig: {
                    type,
                    placeholder
                },
                validation: {
                    required,
                    minLength,
                    maxLength
                },
                value,
                valid: false,
                touched: false
            }
    
}

class ContactData extends Component {
    state = { 
        orderForm:{
            name: createInputForm('', 'name', 'input', 'text', true),    
            street: createInputForm('', 'street', 'input', 'text', true),
            zipCode: createInputForm('', 'ZIP code', 'input', 'text', true, 6, 6),
            country: createInputForm('', 'Country', 'input', 'text', true),
            email: createInputForm('', 'Your Email', 'input', 'email', true)
            
        },
        formIsValid: false
    }
    checkValidaty = (value, rules) => {
        let isValid = true
        if (rules.required){
            isValid = value.trim() !== '' && isValid
        }
        if (rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength ){
            isValid = value.length <= rules.maxLength && isValid
        }
        return isValid

    }
    orderHandler = (e) => {
        e.preventDefault()
        const formData = {}
        for (let elem in this.state.orderForm){
            formData[elem] = this.state.orderForm[elem].value
        }
        const order = {
            price: this.props.price,
            ingredients : this.props.ings,
            orderData: formData
        }
        this.props.onOrderBurger(order)
    }
    inputChangedHandler = (event,inputIdentifier) => {
        const updatedForm = {...this.state.orderForm}
        const updatedFormElement = {...updatedForm[inputIdentifier]}
        updatedFormElement.value = event.target.value
        updatedFormElement.touched = true
        updatedFormElement.valid = this.checkValidaty(updatedFormElement.value,updatedFormElement.validation)
        updatedForm[inputIdentifier] = updatedFormElement
        let formIsValid = true
        for (let inputIdentifier in updatedForm){
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid
        }
        this.setState({orderForm: updatedForm, formIsValid})

    }

    render() {
        let formElementsArray = []
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                
                    {formElementsArray.map(element => (
                        <Input
                            key = {element.id}
                            elementType = {element.config.elementType}
                            elementConfig= {element.config.elementConfig}
                            value={element.config.value}
                            invalid = {!element.config.valid}
                            touched = {element.config.touched}
                            shouldValidate = {element.config.validation}
                            changed={(event) => this.inputChangedHandler(event, element.id)}/>
                    ))}
                    <Button disabled= {!this.state.formIsValid} btnType='Success' >ORDER</Button>
                </form>
        );
        if (this.props.loading){
            form = <Spinner/>
        }
        return(
            <div className= {classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(ContactData, axios))