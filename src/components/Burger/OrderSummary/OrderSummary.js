import React from "react";

import Aux from "../../../Hoc/hoc/Auxiliary";
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .filter((igKey) => igKey !== "amount")
    .map((igKey) => (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {props.ingredients[igKey]}
      </li>
    ));
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Burger amount: {props.ingredients.amount}</p>
      <p>
        <strong>Total Price: {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType={"Danger"} clicked={props.cancel}>
        CANCEL
      </Button>
      <Button btnType={"Success"} clicked={props.continue}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default OrderSummary;
