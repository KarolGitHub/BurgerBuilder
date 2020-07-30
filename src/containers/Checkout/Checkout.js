import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
// import * as orderActions from '../../store/actions/index';
const Checkout = (props) => {
  const cancelHandler = () => props.history.goBack();

  const continueHandler = () => props.history.replace("/checkout/contact-data");

  return props.ings && !props.purchased ? (
    <div>
      <CheckoutSummary
        ingredients={{ ...props.ings, bread: props.bread }}
        checkoutCancelled={cancelHandler}
        checkoutContinued={continueHandler}
      />
      <Route
        path={props.match.path + "/contact-data"}
        component={ContactData}
      />
    </div>
  ) : (
    <Redirect to={"/"} />
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    bread: state.burgerBuilder.bread,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
