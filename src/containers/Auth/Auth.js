import React, {useState} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css'
import * as actions from '../../store/actions/index'
import {connect} from 'react-redux'

const Auth = (props) => {
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'email address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    })
    let formElementsArray = []
    for (let key in controls){
        formElementsArray.push({
            id: key,
                config: controls[key]
        })
    }
    const inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...controls,
            [controlName]:{
                ...controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            }
        }
        setControls(updatedControls)
    }
    const form = formElementsArray.map(element => (
        <Input 
            key = {element.id}
            elementType = {element.config.elementType}
            elementConfig= {element.config.elementConfig}
            value={element.config.value}
            invalid = {!element.config.valid}
            touched = {element.config.touched}
            shouldValidate = {element.config.validation}
            changed={(event) => inputChangedHandler(event, element.id)}
        />
    ))
    const checkValidity = (value, rules) => {
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
        if (rules.isEmail){
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
             isValid = re.test(String(value).toLowerCase());
        }
         return isValid
    }

    const submitHandler = (event) => {
        event.preventDefault()
        props.onAuth(controls.email.value, controls.password.value)
    }
    
    return (
        <div className={classes.Auth}>
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">SUBMIT</Button>

            </form>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    }
}




export default connect(null, mapDispatchToProps)(Auth)