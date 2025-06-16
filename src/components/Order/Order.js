import React from "react";

import classes from "./Order.module.css";

const Order = React.memo((props) => {
  return (
    <div className={classes.Order}>
      <h4>ID: {props.id}</h4>
      <strong>
        <p>Date: {props.date}</p>
        <p>Price: ${Math.abs(props.price.toFixed(2))}</p>
      </strong>
      <button
        className={[classes.BurgerButton, classes[props.btnType]].join(" ")}
        onClick={() => props.clicked(props.index)}
      >
        {props.expand ? "Hide Order" : "Show Order"}
      </button>
    </div>
  );
});

export default Order;
