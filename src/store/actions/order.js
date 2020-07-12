import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';


export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch({
            type: actionTypes.PURCHASE_BURGER_START
        })
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch({
                    type: actionTypes.PURCHASE_BURGER_SUCCESS,
                    orderId: response.data.name,
                    orderData: orderData
                })
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.PURCHASE_BURGER_FAIL,
                    error: error
                })
            });
    };
};

export const purchaseInit = () => {
    return dispatch => {
        dispatch({ type: actionTypes.PURCHASE_INIT })
    };
};

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch({
            type: actionTypes.FETCH_ORDERS_INIT
        });
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
            .then(response => {
                const orders = [];
                for (let key in response.data) {
                    orders.push({ ...response.data[key], id: key });
                }
                dispatch({
                    type: actionTypes.FETCH_ORDERS_SUCCESS,
                    orders: orders
                })
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.FETCH_ORDERS_FAIL,
                    error: error
                })
            });
    }
}