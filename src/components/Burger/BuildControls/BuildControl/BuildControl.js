import React from "react";

import classes from "./BuildControl.module.css";

const buildControl = (props) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>
      {props.label}
      {props.price && `\n$` + props.price}
    </div>
    <button
      disabled={props.label === "Amount" ? props.amount < 2 : !props.amount}
      className={classes.Less}
      onClick={props.removed}
    >
      -
    </button>
    <p className={classes.Amount}>{props.amount}</p>
    <button className={classes.More} onClick={props.added}>
      +
    </button>
  </div>
);

export default buildControl;
