import React, { Component } from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../Hoc/hoc/Auxiliary';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.isOpen !== this.props.isOpen;
    }

    componentDidUpdate() {
        console.log('[Modal] DidUpdate');
    }
    render() {
        return (
            <Aux>
                <Backdrop isOpen={this.props.isOpen} clicked={this.props.isClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.isOpen ? 'translate(0)' : 'translate(-100vh)',
                        opacity: this.props.isOpen ? '1' : '0',
                    }}
                >
                    {this.props.children}
                </div >
            </Aux>
        );
    }
};

export default Modal;