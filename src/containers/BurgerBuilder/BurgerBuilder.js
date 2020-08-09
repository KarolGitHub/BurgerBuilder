import React, { useState, useEffect, useCallback } from "react";
import Aux from "../../Hoc/hoc/Auxiliary";
import { useDispatch, useSelector } from "react-redux";

import classes from "../Checkout/Checkout.module.css";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../Hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import { updateObject } from "../../shared/utility";

const BurgerBuilder = (props) => {
  const [isModal, setModal] = useState(false);

  const dispatch = useDispatch();

  const ings = useSelector((state) => {
    return state.burgerBuilder.ingredients;
  });
  const ingsPrices = useSelector((state) => {
    return state.burgerBuilder.ingredientsPrices;
  });
  const amount = useSelector((state) => {
    return state.burgerBuilder.amount;
  });
  const price = useSelector((state) => {
    return state.burgerBuilder.burgerPrice;
  });
  const totalPrice = useSelector((state) => {
    return state.burgerBuilder.totalPrice;
  });
  const building = useSelector((state) => {
    return state.burgerBuilder.building;
  });
  const isAuth = useSelector((state) => {
    return state.auth.token !== null;
  });
  const loading = useSelector((state) => {
    return state.burgerBuilder.loading;
  });
  const error = useSelector((state) => {
    return state.burgerBuilder.error;
  });
  const purchased = useSelector((state) => {
    return state.order.purchased;
  });

  const onIngredientAdded = (ing) => dispatch(actions.addIng(ing));
  const onIngredientRemoved = (ing) => dispatch(actions.remIng(ing));
  const onBurgerAdded = () => dispatch(actions.addBurger());
  const onPurchaseEnd = () => dispatch(actions.purchaseEnd());
  const onIngredientSet = useCallback(
    (building) => dispatch(actions.setIng(building)),
    [dispatch]
  );

  useEffect(() => {
    onIngredientSet(building);
  }, [onIngredientSet, building]);

  useEffect(() => {
    if (purchased) {
      setModal(!isModal);
    }
    //eslint-disable-next-line
  }, []);

  const onPurchaseEndHandler = (prevState) => {
    setModal(!prevState);
    onPurchaseEnd();
  };

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const modalHandler = (prevState) => {
    if (isAuth) {
      setModal(!prevState);
    } else {
      props.history.push("/login");
    }
  };

  const purchaseFinishHandler = () => {
    props.history.push("/checkout");
  };

  const purchaseContinueHandler = () => {
    onBurgerAdded();
    modalHandler(isModal);
  };

  const ingsInfo = updateObject(ings, { amount: amount });

  let modal = (
    <Modal open={isModal} clicked={() => modalHandler(isModal)}>
      <OrderSummary
        ingredientsInfo={ingsInfo}
        cancel={() => modalHandler(isModal)}
        continue={purchaseContinueHandler}
        finish={purchaseFinishHandler}
        price={price}
        totalPrice={totalPrice}
      />
    </Modal>
  );

  if (loading) {
    modal = (
      <Modal open={isModal} clicked={() => modalHandler(isModal)}>
        <Spinner />
      </Modal>
    );
  } else if (purchased && !building) {
    modal = (
      <Modal open={isModal} clicked={() => onPurchaseEndHandler(isModal)}>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "green" }}>Order Succesful!</p>
          <button
            onClick={() => onPurchaseEndHandler(isModal)}
            className={[classes.BurgerButton, classes["Success"]].join(" ")}
          >
            Confirm
          </button>
        </div>
      </Modal>
    );
  }

  return (
    !error &&
    (ings ? (
      <Aux>
        {modal}
        <Burger ingredients={ings} />
        <BuildControls
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          price={price}
          totalPrice={totalPrice}
          ingsPrices={ingsPrices}
          purchaseable={updatePurchaseState(ings)}
          purchased={() => modalHandler(isModal)}
          isAuth={isAuth}
          ingredientsInfo={ingsInfo}
        />
      </Aux>
    ) : (
      <Spinner />
    ))
  );
};

export default withErrorHandler(BurgerBuilder, axios);
