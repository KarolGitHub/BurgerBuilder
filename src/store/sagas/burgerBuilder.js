import { put } from "redux-saga/effects";
import axios from '../../axios-orders';

import * as actions from "../actions/index";

export function* setIngSaga(action) {
  if (action.building) {
    yield put(actions.initIng(action.building));
  }
  else {
    try {
      const res = yield axios.get(
        "/ingredients.json");
      yield put(actions.setIngredients(res.data, action.building));
    } catch (error) {
      yield put(actions.fetchIngFail(error, action.building))
    }
  }
};