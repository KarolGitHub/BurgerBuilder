import axios from 'axios';
import * as actionTypes from './actionsTypes';

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const authSuccess = (token, id) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: id
    }
}
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch({
            type: actionTypes.AUTH_START,
        });
        let url = isSignup ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAUV54VadlzqqsmLC8yz5DTT5fWTPVFBRA' :
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAUV54VadlzqqsmLC8yz5DTT5fWTPVFBRA';
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true

        };
        axios.post(url, authData)
            .then(res => {
                console.log(res);
                const expDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationTime', expDate);
                localStorage.setItem('userId', res.data.localId);
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(error => {
                dispatch(authFail(error));
            });
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        }
        else {
            const expDate = new Date(localStorage.getItem('expirationTime'));
            if (expDate <= new Date()) {
                dispatch(logout());
            }
            else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};




