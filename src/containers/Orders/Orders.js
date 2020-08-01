import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../Hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";

const Orders = (props) => {
  const { onFetchOrders, token, userId } = props;
  const [showBurger, setBurger] = useState(null);
  useEffect(() => {
    onFetchOrders(token, userId);
  }, [onFetchOrders, token, userId]);

  const showBurgerHandler = (id) => {
    if (showBurger !== id) {
      setBurger(id);
    } else {
      setBurger(null);
    }
  }

  return !props.loading ? (
    <div>
      {props.orders.map((order) => (
        <Order
          key={order.id}
          id={order.id}
          ingredients={order.ingredients}
          bread={order.bread}
          price={+order.price}
          expand={showBurger === order.id ? true : false}
          btnType={showBurger === order.id ? "Danger" : "Success"}
          clicked={() => showBurgerHandler(order.id)} 
        />
      ))}
    </div>
  ) : (
      <Spinner />
    );
};

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
