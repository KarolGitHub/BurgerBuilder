import React from "react";

import classes from "./Burger.module.css";
import BurgerIngedient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  let bread = 0;
  let transformedIngedients = Object.keys(props.ingredients)
    .map((igKey) => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        if (igKey === "bread") {
          bread += 1;
          return null;
        } else {
          return <BurgerIngedient key={igKey + i} type={igKey} />;
        }
      });
    })
    .reduce((arr, el) => arr.concat(el), []);

  if (bread > 0) {
    let index = Math.round(transformedIngedients.length / (bread + 1));
    for (let i = index, j = 0; j < bread; i += index) {
      transformedIngedients.splice(
        i + j,
        0,
        <BurgerIngedient key={"bread" + j} type="bread" />
      );
      j++;
    }
  }

  if (transformedIngedients.length === 0) {
    transformedIngedients = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngedient type="bread-top" />
      {transformedIngedients}
      <BurgerIngedient type="bread-bottom" />
    </div>
  );
};

export default burger;
