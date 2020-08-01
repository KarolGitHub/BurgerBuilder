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
    if (error.response) {
      //  The request was made and the server responded with a
      //  status code that falls out of the range of 2xx
      yield put(actions.fetchFail(error.response.data.error.message));
    } else if (error.message) {
      // Something happened in setting up the request and triggered an Error
      yield put(actions.fetchFail(error.message));
    } else {
      // Unexpected Error
      yield put(actions.fetchFail("Oops something went wrong!"));
    }
  }
}
