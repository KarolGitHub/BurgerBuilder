import React, { useEffect } from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../Hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";

const Orders = (props) => {
  const { onFetchOrders, token, userId } = props;
  useEffect(() => {
    onFetchOrders(token, userId);
  }, [onFetchOrders, token, userId])

  return !props.loading
    ? (
      <div>
        {props.orders.map((order) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price}
          />
        ))}
      </div>)
    : (
      <Spinner />
    );
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, id) => dispatch(actions.fetchOrders(token, id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
