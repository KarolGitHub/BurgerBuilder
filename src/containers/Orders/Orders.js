import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {

        return (
            !this.props.error ?
                !this.props.loading ?
                    <div>
                        {this.props.orders.map(order => (
                            <Order
                                key={order.id}
                                ingredients={order.ingredients}
                                price={+order.price} />
                        ))}
                    </div> : <Spinner /> :
                <div>
                    <h1>Orders can't be loaded!</h1>
                    <p>{this.props.error.message}</p>
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.order.loading,
        orders: state.order.orders,
        error: state.order.error,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));