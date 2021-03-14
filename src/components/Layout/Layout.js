import React, { Fragment,Component } from 'react';
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'

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
            <Toolbar isAuth={this.props.isAuth} clicked = {this.sideDrawerHandler.bind(this)}/>
            <SideDrawer isAuth={this.props.isAuth} open = {this.state.showSideDrawer} 
            closed = {this.sideDrawerHandler.bind(this)}/>
            <main className={classes.content}>
                {this.props.children}
            </main>
        </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}


export default connect(mapStateToProps)(Layout)