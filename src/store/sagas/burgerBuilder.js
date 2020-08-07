import { put } from "redux-saga/effects";
import axios from "../../axios-orders";

import * as actions from "../actions/index";

export function* setIngSaga(action) {
  if (action.building) {
    yield put(actions.initIng(action.building));
  } else {
    try {
      const [res1, res2] = yield Promise.all([
        axios.get("/ingredients.json"),
        axios.get("/ingredientsPrices.json"),
      ]);
      yield put(actions.setIngredients(res1.data, res2.data, action.building));
    } catch (error) {
      if (error.response) {
        //  The request was made and the server responded with a
        //  status code that falls out of the range of 2xx
        yield put(actions.fetchIngFail(error.response.data.error));
      } else if (error.message) {
        // Something happened in setting up the request and triggered an Error
        yield put(actions.fetchIngFail(error.message));
      } else {
        // Unexpected Error
        yield put(actions.fetchIngFail("Oops something went wrong!"));
      }
    }
  }
}
