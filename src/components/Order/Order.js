import React from "react";

import Burger from "../Burger/Burger";
import classes from "./Order.module.css";

const Order = React.memo((props) => {
  const ingredients = [];

  for (let ingName in props.ingredients) {
    ingredients.push({
      name: ingName,
      amount: props.ingredients[ingName],
    });
  }

  ingredients.push({
    name: "bread",
    amount: props.bread,
  });

  const ingredientOutput = ingredients.map((ig) => {
    return (
      ig.amount > 0 && (
        <span className={classes.Span} key={ig.name}>
          {ig.name} ({ig.amount})
        </span>
      )
    );
  });

  return (
    <div className={classes.Order}>
      <h4>{props.id}</h4>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {props.expand && (
        <Burger ingredients={props.ingredients} bread={props.bread} />
      )}
      <button
        className={[classes.BurgerButton, classes[props.btnType]].join(" ")}
        onClick={props.clicked}
      >
        {props.expand ? "Hide Burger" : "Show Burger"}
      </button>
    </div>
  );
});

export default Order;
