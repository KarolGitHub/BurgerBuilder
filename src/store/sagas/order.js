import { put } from "redux-saga/effects";
import axios from "../../axios-orders";

import * as actions from "../actions/index";

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseStart());
  try {
    const res = yield axios.post(
      "/orders.json?auth=" + action.token,
      action.orderData
    );
    yield put(actions.purchaseSuccess(res.data.name, action.orderData));
  } catch (error) {
    yield put(actions.purchaseFail(error));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchInit());
  const queryParams =
    "?auth=" +
    action.token +
    '&orderBy="userId"&equalTo="' +
    action.userId +
    '"';
  try {
    const res = yield axios.get("/orders.json" + queryParams);
    const orders = [];
    for (let key in res.data) {
      orders.push({ ...res.data[key], id: key });
    }
    yield put(actions.fetchSuccess(orders));
  } catch (error) {
    yield put(actions.fetchFail(error));
  }
}
