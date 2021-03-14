import React from 'react'
import classes from './NavigationItems.module.css'
import NavItem from './NavItem/NavItem'
const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavItem link="/" exact>Burger Builder</NavItem>
        {props.isAuth && <NavItem link="/orders" >Orders</NavItem>}
        {props.isAuth ? <NavItem link="/logout" >LOG OUT</NavItem>
        : <NavItem link="/auth" >Authenticate</NavItem> }
    </ul>
)


export default NavigationItems;