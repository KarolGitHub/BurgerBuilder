import { put, delay, call } from "redux-saga/effects";
import axios, { prefixURL } from "../../axios-orders";

import * as actions from "../actions/index";

export function* logoutSaga(action) {
  yield call([localStorage, "removeItem"], "token");
  yield call([localStorage, "removeItem"], "expirationTime");
  yield call([localStorage, "removeItem"], "userId");
  yield put(actions.didLogout());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  let url = action.isSignup
    ? prefixURL + ":signUp?key=AIzaSyAUV54VadlzqqsmLC8yz5DTT5fWTPVFBRA"
    : prefixURL +
      ":signInWithPassword?key=AIzaSyAUV54VadlzqqsmLC8yz5DTT5fWTPVFBRA";
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  try {
    const response = yield axios.post(url, authData);

    const expDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield call([localStorage, "setItem"], "token", response.data.idToken);
    yield call([localStorage, "setItem"], "userId", response.data.localId);
    yield call([localStorage, "setItem"], "expirationTime", expDate);
    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    );
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    if (error.response) {
      //  The request was made and the server responded with a
      //  status code that falls out of the range of 2xx
      yield put(actions.authFail(error.response.data.error.message));
    } else if (error.message) {
      // Something happened in setting up the request and triggered an Error
      yield put(actions.authFail(error.message));
    } else {
      // Unexpected Error
      yield put(actions.authFail("Oops something went wrong!"));
    }
  }
}

export function* authCheckStateSaga() {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout());
  } else {
    const expDate = yield new Date(localStorage.getItem("expirationTime"));
    if (expDate <= new Date()) {
      yield put(actions.logout());
    } else {
      const userId = yield localStorage.getItem("userId");
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAuthTimeout(
          (expDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}
