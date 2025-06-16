import React from "react";

import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../../Hoc/hoc/Auxiliary";

const Modal = (props) => {
  return (
    <Aux>
      <Backdrop open={props.open} clicked={props.clicked} />
      <div
        className={classes.Modal}
        style={{
          transform: props.open ? "translate(0)" : "translate(-100vw)",
          opacity: props.open ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};

export default React.memo(Modal, (prevProps, nextProps) => {
  return (
    nextProps.open === prevProps.open &&
    nextProps.children === prevProps.children
  );
});
