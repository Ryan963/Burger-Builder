import React, {useState, useEffect} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import {connect} from 'react-redux'
import { Redirect } from 'react-router';

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
        },
    })
    useEffect(() => {
        if (!props.building && props.authRedirectPath !== '/'){
            props.onSetAuthRedirectPath()

        }
    })

    const [isSignup, setIsSignup] = useState(true)
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
    let form = formElementsArray.map(element => (
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
    const switchAuthModeHandler = () => {
        setIsSignup(prevState => {
            return !prevState
        })
    }
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
        props.onAuth(controls.email.value, controls.password.value, isSignup)
    }
    if (props.loading) {
        form = <Spinner/>
    }

    let errorMessage = null
    if (props.error){
        errorMessage = (
            <p>{props.error.message}</p>
        )
    }
    let authRedirect = null
    if (props.isAuth){
        authRedirect = <Redirect to={props.authRedirectPath}/>
    }
    
    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button clicked={switchAuthModeHandler} btnType='Danger'>{isSignup ? "SIGNIN" : "SIGNUP"} instead</Button>
        </div>
    )
}

const mapStateToprops = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
}




export default connect(mapStateToprops, mapDispatchToProps)(Auth)