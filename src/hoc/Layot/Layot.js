import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import classes from './Layot.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { withRouter } from 'react-router-dom';

class Layot extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    drawerToggleClickedHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }

    onLogoClickHandler = () => {
        this.props.history.replace('/')
    }

    render() {
        return (
            <Aux>
                <Toolbar clicked={this.onLogoClickHandler} drawerToggleClicked={ this.drawerToggleClickedHandler }/>
                <SideDrawer
                    open={ this.state.showSideDrawer }
                    closed={ this.sideDrawerClosedHandler }/>
                <main className={ classes.Content }>
                    { this.props.children }
                </main>
            </Aux>
        )
    }
}

export default withRouter(Layot);