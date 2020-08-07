import React, { useState } from "react";
import { connect } from "react-redux";

import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../Hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/order";
import { updateObject, isValid } from "../../../shared/utility";

const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Street",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ZIP Code",
      },
      value: "",
      validation: {
        required: true,
        isNumeric: true,
        minLength: 5,
        maxLength: 5,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your E-Mail",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      value: "fastest",
      validation: null,
      valid: true,
    },
  });

  const [formIsValid, setFormValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementID in orderForm) {
      formData[formElementID] = orderForm[formElementID].value;
    }

    const order = {
      order: updateObject(props.order),
      price: Math.abs(props.price.toFixed(2)),
      orderData: formData,
      userId: props.userId,
    };

    props.onOrderBurger(order, props.token);
  };

  const inputChangedHandler = (event, inputID) => {
    const updatedFormElement = updateObject(orderForm[inputID], {
      value: event.target.value,
      valid: isValid(event.target.value, orderForm[inputID].validation),
      touched: true,
    });
    const updatedOrderForm = updateObject(orderForm, {
      [inputID]: updatedFormElement,
    });

    let formIsValid = true;
    for (let inputID in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputID].valid && formIsValid;
    }

    setOrderForm(updatedOrderForm);
    setFormValid(formIsValid);
  };

  let formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key],
    });
  }

  return !props.loading ? (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      <form onSubmit={orderHandler}>
        {formElementsArray.map((formElement, index) => (
          <Input
            focus={index === 0 ? true : false}
            key={formElement.id}
            elementtype={formElement.config.elementType}
            elementconfig={formElement.config.elementConfig}
            value={formElement.config.value}
            change={(event) => inputChangedHandler(event, formElement.id)}
            invalid={
              formElement.config.touched ? !formElement.config.valid : false
            }
          />
        ))}
        <Button
          btnType="Success"
          disabled={!formIsValid}
          clicked={orderHandler}
        >
          ORDER
        </Button>
      </form>
    </div>
  ) : (
    <Spinner />
  );
};

const mapStateToProps = (state) => {
  return {
    order: state.burgerBuilder.order,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
