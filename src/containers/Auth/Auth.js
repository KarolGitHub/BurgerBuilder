import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions/index";
import axios from "../../axios-orders";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import withErrorHandler from "../../Hoc/withErrorHandler/withErrorHandler";
import { updateObject, isValid } from "../../shared/utility";
const Auth = (props) => {
  const [controls, setControls] = useState(
    {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },

      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
          maxLength: 20,
        },
        valid: false,
        touched: false,
      }
    });

  const [isSignup, setSignup] = useState(true);

  const inputChangedHandler = (event, inputID) => {
    const updatedControls = updateObject(controls, {
      [inputID]: updateObject(controls[inputID], {
        value: event.target.value,
        valid: isValid(
          event.target.value,
          controls[inputID].validation,
          isSignup
        ),
        touched: true,
      }),
    });
    setControls(updatedControls);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(
      controls.email.value,
      controls.password.value,
      isSignup
    );
  };

  const switchAuthModeHandler = () => {
    setSignup(!isSignup);
  };

  let formElementsArray = [];
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key],
    });
  }

  const form = formElementsArray.map((formElement, index) => (
    <Input
      focus={index === 0 ? true : false}
      key={formElement.id}
      elementtype={formElement.config.elementType}
      elementconfig={formElement.config.elementConfig}
      value={formElement.config.value}
      change={(event) => inputChangedHandler(event, formElement.id)}
      invalid={formElement.config.touched ? !formElement.config.valid : false}
    />
  ));

  let error = props.error && (
    <p style={{ color: "red", font: "bold" }}>{props.error.message}</p>
  );

  return !props.loading ? (
    !props.isAuth ? (
      <div className={classes.Auth}>
        {error}
        <form onSubmit={submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button btnType="Danger" clicked={switchAuthModeHandler}>
          SWITCH TO {isSignup ? "SIGN IN" : "SIGN UP"}
        </Button>
      </div>
    ) : (
        <Redirect to="/" />
      )
  ) : (
      <Spinner />
    );
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Auth, axios));
