import React from 'react';
import { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: null,
        bread: 0,
        totalPrice: 0,
    }

    queryHandler = () => {
        const query = new URLSearchParams(this.props.location.search);
        // console.log(this.props);
        // console.log(...query);
        let ingredients = {};
        let price = null;
        let bread = null;
        for (let entries of query.entries()) {
            if (entries[0] === 'price')
                price = entries[1];
            else if (entries[0] === 'bread')
                bread = entries[1];
            else {
                ingredients[entries[0]] = +entries[1];
            }

        }
        this.setState({ ingredients: ingredients, bread: bread, totalPrice: price })
    }

    componentWillMount() {
        this.queryHandler();
    }

    /*  componentDidUpdate() {
         if (this.state.ingredients !== this.props.location.search)
             this.queryHandler();
     } */

    cancelHandler = () => (
        this.props.history.goBack()
    )

    continueHandler = () => (
        this.props.history.replace('/checkout/contact-data')
    )
    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={{ ...this.state.ingredients, bread: this.state.bread }}
                    checkoutCancelled={this.cancelHandler}
                    checkoutContinued={this.continueHandler} />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => <ContactData ingredients={this.state.ingredients} bread={this.state.bread} totalPrice={this.state.totalPrice} {...props}/>} />
            </div>
        );
    }
}

export default Checkout;