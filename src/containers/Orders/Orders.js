import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import classes from "./Orders.module.css";
import Burger from "../../components/Burger/Burger";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../Hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import ReactTable from "../../components/Order/ReactTable/ReactTable";
import { updateObject } from "../../shared/utility";

const Orders = (props) => {
  const [showBurger, setBurger] = useState(null);
  const [data, setData] = useState(null);
  const [showOrder, setOrder] = useState(false);

  const dispatch = useDispatch();

  const orders = useSelector((state) => {
    return state.order.orders;
  });
  const loading = useSelector((state) => {
    return state.order.loading;
  });
  const token = useSelector((state) => {
    return state.auth.token;
  });
  const userId = useSelector((state) => {
    return state.auth.userId;
  });

  const onFetchOrders = useCallback(
    (token, id) => dispatch(actions.fetchOrders(token, id)),
    [dispatch]
  );

  useEffect(() => {
    onFetchOrders(token, userId);
  }, [onFetchOrders, token, userId]);

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

  const showOrderHandler = (id) => {
    setData(Object.values(updateObject(updateObject(orders)[id].order)));
    setOrder(true);
  };

  const goBackHandler = () => {
    setOrder(false);
    setBurger(false);
  };

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
    ],
    [showBurger, showBurgerHandler]
  );

  let table = <Spinner />;
  if (!loading) {
    if (data && showOrder) {
      table = (
        <div className={classes.Orders}>
          <h1>Your Order</h1>
          <ReactTable
            columns={columns}
            data={data}
            defaultPageSize={data.length < 10 ? data.length : 10}
            resizeable={true}
            sortable={true}
          />
          <button
            onClick={goBackHandler}
            className={[
              classes.BurgerButton,
              classes.Danger,
              classes.GoBackButton,
            ].join(" ")}
          >
            Go Back
          </button>
          {showBurger && <Burger ingredients={data[showBurger].ingredients} />}
        </div>
      );
    } else {
      table = orders.map((order, index) => (
        <Order
          key={order.id}
          id={order.id}
          index={index}
          order={order.order}
          price={+order.price}
          btnType={showBurger === order.id ? "Danger" : "Success"}
          clicked={(id) => showOrderHandler(id)}
        />
      ));
    }
  }
  return table;
};

export default withErrorHandler(Orders, axios);
