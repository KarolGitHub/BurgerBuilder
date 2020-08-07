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
      <ul>{ingredientSummary}</ul>
      <p>Burger amount: {props.ingredients.amount}</p>
      <p>
        <strong>Burger Price: ${Math.abs(props.price.toFixed(2))}</strong>
      </p>
      <p>
        <strong>Order Price: ${Math.abs(props.totalPrice.toFixed(2))}</strong>
      </p>
      <Button btnType={"Danger"} clicked={props.cancel}>
        Cancel
      </Button>
      <Button btnType={"Success"} clicked={props.continue}>
        Add to Cart
      </Button>
      <Button btnType={"Success"} clicked={props.finish}>
        Finish Order
      </Button>
    </Aux>
  );
};

export default OrderSummary;
