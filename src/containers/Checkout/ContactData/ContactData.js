import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axiosOrders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

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
        loading: false,
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
        this.setState({loading: true})
        const formData = {}
        for (let elem in this.state.orderForm){
            formData[elem] = this.state.orderForm[elem].value
        }
        const order = {
            price: this.props.price,
            ingredients : this.props.ingredients,
            orderData: formData
        }
        axios.post('/orders.json', order)
        .then(res => {
            this.setState({loading: false})
            this.props.history.push('/')
        })
        .catch(err => this.setState({loading: false}))
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
        if (this.state.loading){
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

export default ContactData