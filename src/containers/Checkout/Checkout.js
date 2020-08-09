import React, { useMemo, useState, useCallback, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Burger from "../../components/Burger/Burger";
import ContactData from "./ContactData/ContactData";
import ReactTable from "../../components/Order/ReactTable/ReactTable";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import classes from "./Checkout.module.css";
import * as actions from "./../../store/actions/index";

const Checkout = (props) => {
  const [showBurger, setBurger] = useState(null);
  const { history, match } = props;

  const dispatch = useDispatch();

  const order = useSelector((state) => {
    return state.burgerBuilder.order;
  });
  const totalPrice = useSelector((state) => {
    return state.burgerBuilder.totalPrice;
  });
  const purchased = useSelector((state) => {
    return state.order.purchased;
  });

  const data = useMemo(() => order, [order]);

  const cancelHandler = useCallback(() => history.push("/"), [history]);

  const continueHandler = () => history.push("checkout/contact-data");

  const onBurgerRebuild = useCallback(
    (id) => dispatch(actions.rebuildBurger(id)),
    [dispatch]
  );

  const onBurgerDelete = useCallback(
    (id) => dispatch(actions.deleteBurger(id)),
    [dispatch]
  );

  const onPurchaseBurgerEnd = useCallback(
    () => dispatch(actions.purchaseBurgerEnd()),
    [dispatch]
  );

  const showBurgerHandler = useCallback(
    (id) => {
      if (id === showBurger) {
        setBurger(null);
      } else {
        setBurger(id);
      }
    },
    [showBurger]
  );

  const onBurgerRebuildHandler = useCallback(
    (id) => {
      onBurgerRebuild(id);
      cancelHandler();
    },
    [onBurgerRebuild, cancelHandler]
  );

  const onBurgerDeleteHandler = useCallback(
    (id) => {
      onBurgerDelete(id);
      setBurger(null);
    },
    [onBurgerDelete, setBurger]
  );

  const burgerSum = (data) => {
    let sum = 0;
    for (let burger of data) {
      sum += burger.amount;
    }
    return sum;
  };

  useEffect(() => {
    if (purchased) {
      return () => onPurchaseBurgerEnd();
    }
  }, [onPurchaseBurgerEnd, purchased]);

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        id: "index",
        accessor: (row) => row.id,
        Cell: (row) => row.row.index + 1,
        maxWidth: 20,
        minWidth: 20,
      },
      {
        Header: "Amount",
        accessor: "amount",
        maxWidth: 80,
        minWidth: 80,
      },
      {
        id: "ingredients",
        Header: "Ingredients",
        accessor: (row) =>
          Object.entries(row.ingredients).map((key) => {
            return (
              key[1] > 0 && (
                <span className={classes.Span} key={key[0]}>
                  {key[0]} ({key[1]})
                </span>
              )
            );
          }),
        resizeable: true,
        maxWidth: 1000,
        minWidth: 200,
      },
      {
        Header: "Price",
        accessor: (row) => "$" + Math.abs(row.burgerPrice.toFixed(2)),
        maxWidth: 60,
        minWidth: 60,
      },
      {
        id: "burger",
        maxWidth: 70,
        minWidth: 70,
        Cell: ({ row }) => (
          <button
            onClick={() => {
              showBurgerHandler(row.id);
            }}
            className={[
              classes.BurgerButton,
              classes[showBurger === row.id ? "Danger" : "Success"],
            ].join(" ")}
          >
            {showBurger === row.id ? "Hide" : "Show"}
          </button>
        ),
      },
      {
        id: "rebuild",
        maxWidth: 90,
        minWidth: 90,
        Cell: ({ row }) => (
          <button
            onClick={() => onBurgerRebuildHandler(row.id)}
            className={[classes.BurgerButton, classes["Success"]].join(" ")}
          >
            Rebuild
          </button>
        ),
      },
      {
        id: "delete",
        maxWidth: 20,
        minWidth: 20,
        Cell: ({ row }) => (
          <button
            onClick={() => onBurgerDeleteHandler(row.id)}
            className={[classes.BurgerButton, classes["Danger"]].join(" ")}
          >
            Delete
          </button>
        ),
      },
    ],
    [
      showBurger,
      showBurgerHandler,
      onBurgerRebuildHandler,
      onBurgerDeleteHandler,
    ]
  );

  return data.length > 0 && !purchased ? (
    <div className={classes.Checkout}>
      <h1>Your Order</h1>
      <ReactTable
        columns={columns}
        data={data}
        defaultPageSize={data.length < 10 ? data.length : 10}
        resizeable={true}
        sortable={true}
      />
      {showBurger && <Burger ingredients={data[showBurger].ingredients} />}
      <CheckoutSummary
        amount={burgerSum(data)}
        totalPrice={totalPrice}
        checkoutCancelled={cancelHandler}
        checkoutContinued={continueHandler}
      />
      <Route path={match.path + "/contact-data"} component={ContactData} />
    </div>
  ) : (
    <Redirect to={"/"} />
  );
};

export default Checkout;
