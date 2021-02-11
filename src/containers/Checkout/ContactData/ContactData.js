import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axiosOrders'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
        street: '',
        postalCode: ''
        },
        loading: false
    }
    orderHandler = (e) => {
        e.preventDefault()
        this.setState({loading: true})
        const order = {
            price: this.props.price,
            ingredients : this.props.ingredients,
            customer: {
                name: "Ryan Thabet",
                address: {
                    street: "21 jump street",
                    zipCode: 'T5T2ED',
                    country: 'Canada'
                },
                email: 'ryan.thabe@gmail.com'   
            },
        }
        axios.post('/orders.json', order)
        .then(res => {
            this.setState({loading: false})
            this.props.history.push('/')
        })
        .catch(err => this.setState({loading: false}))
    }

    render() {
        let form = (
            <form>
                    <input type="text" name = 'name' placeholder="Your name"/>
                    <input type="email" name = 'email' placeholder="Your email"/>
                    <input type="text" name = 'street' placeholder="street"/>
                    <input type="text" name = 'postal' placeholder="Postal Code"/>
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