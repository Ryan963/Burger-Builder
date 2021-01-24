import React, { Fragment,Component } from 'react';
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerHandler() {
        this.setState({showSideDrawer: !this.state.showSideDrawer});
    }
    render() {
        return (
        <Fragment>
            <Toolbar clicked = {this.sideDrawerHandler.bind(this)}/>
            <SideDrawer open = {this.state.showSideDrawer} 
            closed = {this.sideDrawerHandler.bind(this)}/>
            <main className={classes.content}>
                {this.props.children}
            </main>
        </Fragment>
        )
    }
}


export default Layout