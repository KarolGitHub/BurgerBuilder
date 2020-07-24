import React from "react";
import classes from "./BurgerIngredient.module.css";
import PropTypes from "prop-types";

const BurgerIngredient = (props) => {

  let ingredient = null;

  switch (props.type) {
    case "bread-bottom":
      ingredient = <div className={classes.BreadBottom}></div>;
      break;
    case "bread-top":
      ingredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1} />
          <div className={classes.Seeds2} />
        </div>
      );
      break;
    case "bread":
      ingredient = <div className={classes.Bread} />;
      break;
    case "meat":
      ingredient = <div className={classes.Meat} />;
      break;
    case "cheese":
      ingredient = <div className={classes.Cheese} />;
      break;
    case "salad":
      ingredient = <div className={classes.Salad} />;
      break;
    case "bacon":
      ingredient = <div className={classes.Bacon} />;
      break;
    default:
      ingredient = null;
  }
  return ingredient;
}


BurgerIngredient.propTypes = {
  // type: PropTypes.string.oneOf(['bread-bottom', 'bread-top', 'meat', 'cheese', 'salad', 'bacon']).isRequired,
  type: PropTypes.string.isRequired,
};

export default BurgerIngredient;
