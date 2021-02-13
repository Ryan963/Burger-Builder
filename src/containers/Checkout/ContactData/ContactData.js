import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axiosOrders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

const createInputForm = (value, placeholder, elementType, type) => {
    return {
                elementType,
                elementConfig: {
                    type,
                    placeholder
                },
                value
            }
    
}

class ContactData extends Component {
    state = { 
        orderForm:{
            name: createInputForm('', 'name', 'input', 'text'),    
            street: createInputForm('', 'street', 'input', 'text'),
            zipCode: createInputForm('', 'ZIP code', 'input', 'text'),
            country: createInputForm('', 'Country', 'input', 'text'),
            email: createInputForm('', 'Your Email', 'input', 'email')   
            
        },
        loading: false
    }
    orderHandler = (e) => {
        e.preventDefault()
        this.setState({loading: true})
        const order = {
            price: this.props.price,
            ingredients : this.props.ingredients,
        }
        axios.post('/orders.json', order)
        .then(res => {
            this.setState({loading: false})
            this.props.history.push('/')
        })
        .catch(err => this.setState({loading: false}))
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
            <form>
                
                    {formElementsArray.map(element => (
                        <Input
                            key = {element.id}
                            elementType = {element.config.elementType}
                            elementConfig= {element.config.elementConfig}
                            value={element.config.value}/>
                    ))}
                    <Button btnType='Success' clicked = {this.orderHandler}>ORDER</Button>
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