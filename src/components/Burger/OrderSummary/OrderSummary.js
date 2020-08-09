import React from "react";

import Aux from "../../../Hoc/hoc/Auxiliary";
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredientsInfo)
    .filter((igKey) => igKey !== "amount")
    .map((igKey) => (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {props.ingredientsInfo[igKey]}
      </li>
    ));
  const price = Math.abs(props.price.toFixed(2));
  const totalPrice = Math.abs(props.totalPrice.toFixed(2));
  return (
    <Aux>
      <h3>Your Order</h3>
      <ul>{ingredientSummary}</ul>
      <p>Burger amount: {props.ingredientsInfo.amount}</p>
      <p>
        <strong>Burger Price: ${price}</strong>
      </p>
      <p>
        <strong>Order Price: ${totalPrice}</strong>
      </p>
      <Button btnType={"Danger"} clicked={props.cancel}>
        Cancel
      </Button>
      <Button btnType={"Success"} clicked={props.continue}>
        Add to Cart
      </Button>
      <Button
        btnType={"Success"}
        clicked={props.finish}
        disabled={totalPrice > 0 ? false : true}
      >
        Finish Order
      </Button>
    </Aux>
  );
};

export default OrderSummary;
