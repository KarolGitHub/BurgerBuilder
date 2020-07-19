import { put, delay, call } from "redux-saga/effects";
import axios, { prefixURL } from '../../axios-orders';

import * as actions from "../actions/index";

export function* logoutSaga(action) {
  yield call([localStorage, 'removeItem'], 'token');
  yield call([localStorage, 'removeItem'], 'expirationTime');
  yield call([localStorage, 'removeItem'], 'userId');
  yield put(actions.didLogout());
};

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
};

export function* authUserSaga(action) {
  yield put(actions.authStart());
  let url = action.isSignup
    ? prefixURL + ":signUp?key=AIzaSyAUV54VadlzqqsmLC8yz5DTT5fWTPVFBRA"
    : prefixURL + ":signInWithPassword?key=AIzaSyAUV54VadlzqqsmLC8yz5DTT5fWTPVFBRA";
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  try {
    const res = yield axios.post(url, authData);
    // console.log(res);
    const expDate = yield new Date(
      new Date().getTime() + res.data.expiresIn * 1000
    );
    yield call([localStorage, 'setItem'], 'token', res.data.idToken);
    yield call([localStorage, 'setItem'], 'userId', res.data.localId);
    yield call([localStorage, 'setItem'], 'expirationTime', expDate);
    yield put(actions.authSuccess(res.data.idToken, res.data.localId));
    yield put(actions.checkAuthTimeout(res.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error));
  }
};

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
      yield put(actions.checkAuthTimeout((expDate.getTime() - new Date().getTime()) / 1000));
    }
  }
};
