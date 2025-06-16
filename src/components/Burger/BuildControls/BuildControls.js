import React from "react";
import PropTypes from "prop-types";

import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
  { label: "Bacon", type: "bacon" },
  { label: "Bread", type: "bread" },
  { label: "Burger amount", type: "amount" },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Burger Price: <strong>${Math.abs(props.price).toFixed(2)}</strong>
    </p>
    <p>
      Order Price: <strong>${Math.abs(props.totalPrice).toFixed(2)}</strong>
    </p>
    {controls.map((control) => (
      <BuildControl
        key={control.label}
        label={control.label}
        added={() => props.ingredientAdded(control.type)}
        removed={() => props.ingredientRemoved(control.type)}
        amount={props.ingredientsInfo[control.type]}
        price={control.type !== "amount" && props.ingsPrices[control.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchaseable}
      onClick={props.purchased}
    >
      {props.isAuth ? "ORDER NOW" : "LOG IN IS REQUIRED"}
    </button>
  </div>
);

buildControls.propTypes = {
  ingredientAdded: PropTypes.func.isRequired,
  ingredientRemoved: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  purchaseable: PropTypes.bool.isRequired,
  purchased: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  ingredientsInfo: PropTypes.object.isRequired,
};
export default buildControls;
