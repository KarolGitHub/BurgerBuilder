import React, { Component } from 'react';

import Aux from '../hoc/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';
class Layout extends Component {

    state = {
        showSidedrawer: false,
    }

    sidedrawerClosedHandler = (oldState) => {
        this.setState({
            showSidedrawer: !oldState
        });
    };

    render() {
        return (
            <Aux>
                <Toolbar
                    openMenu={() => this.sidedrawerClosedHandler(this.state.showSidedrawer)}
                />
                <Sidedrawer
                    isOpen={this.state.showSidedrawer}
                    closed={() => this.sidedrawerClosedHandler(this.state.showSidedrawer)} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
};

export default Layout;