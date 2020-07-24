import React, { useState } from "react";

import Aux from "../hoc/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Sidedrawer from "../../components/Navigation/Sidedrawer/Sidedrawer";
import { connect } from "react-redux";
const Layout = (props) => {
  const [showSidedrawer, setshowSidedrawer] = useState(false);

  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuth}
        openMenu={() => setshowSidedrawer(!showSidedrawer)}
      />
      <Sidedrawer
        isAuth={props.isAuth}
        open={showSidedrawer}
        closed={() => setshowSidedrawer(false)}
      />
      <main className={classes.Content}>
        {props.children}
      </main>
    </Aux>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
