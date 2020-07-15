import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
// import * as orderActions from '../../store/actions/index';
class Checkout extends Component {

    cancelHandler = () => (
        this.props.history.goBack()
    )

    continueHandler = () => (
        this.props.history.replace('/checkout/contact-data')
    )
    render() {
        return (
            this.props.ings && !this.props.purchased ?
                <div>
                    <CheckoutSummary
                        ingredients={{ ...this.props.ings, bread: this.props.bread }}
                        checkoutCancelled={this.cancelHandler}
                        checkoutContinued={this.continueHandler} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
                : <Redirect to={'/'} />
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        bread: state.burgerBuilder.bread,
        purchased: state.order.purchased
    }
};

export default connect(mapStateToProps)(Checkout);