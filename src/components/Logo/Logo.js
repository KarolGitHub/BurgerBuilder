import React from "react";
import { NavLink } from "react-router-dom";

import burgerLogo from "../../assets/images/burger-logo.png";
import classes from "./Logo.module.css";

const logo = () => (
  <NavLink to="/" exact>
    <div className={classes.Logo}>
      <img src={burgerLogo} alt="MyBurger" />
    </div>
  </NavLink>
);

export default logo;
