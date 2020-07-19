import React, { Component } from "react";

import Aux from "../hoc/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Sidedrawer from "../../components/Navigation/Sidedrawer/Sidedrawer";
import { connect } from "react-redux";
class Layout extends Component {
  state = {
    showSidedrawer: false,
  };

  sidedrawerClosedHandler = (oldState) => {
    this.setState({
      showSidedrawer: !oldState,
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar
          isAuth={this.props.isAuth}
          openMenu={() =>
            this.sidedrawerClosedHandler(this.state.showSidedrawer)
          }
        />
        <Sidedrawer
          isAuth={this.props.isAuth}
          isOpen={this.state.showSidedrawer}
          closed={() => this.sidedrawerClosedHandler(this.state.showSidedrawer)}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
