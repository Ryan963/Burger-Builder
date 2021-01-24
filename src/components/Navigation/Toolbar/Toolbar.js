import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div onClick={props.clicked} className={classes.DrawerToggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div className={classes.Logo}>
                <Logo/>
        </div> 
        <nav className={classes.Desktop}>
            <NavigationItems/>
        </nav>
    </header>
)

export default toolbar