import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Sidedrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../Hoc/hoc/Auxiliary';

const Sidedrawer = (props) => {
    let attachedClasses = [classes.Sidedrawer, classes.Close];
    if(props.isOpen) {
        attachedClasses = [classes.Sidedrawer, classes.Open]
    }
    return (
        <Aux>
            <Backdrop isOpen={props.isOpen} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth}/>
                </nav>

            </div>
        </Aux>
    );
};

export default Sidedrawer;