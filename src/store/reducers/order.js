import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    error: false,
    loading: false,
    purchased: false
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = {
        ...action.orderData,
        id: action.orderId
    };
    return updateObject(state, {
        orders: state.orders.concat(newOrder),
        purchased: true, loading: false
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, { purchased: false });
        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state, { loading: true })
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL:
            return updateObject(state, { loading: false, error: action.error });
        case actionTypes.FETCH_ORDERS_INIT:
            return updateObject(state, { loading: true });
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state, { orders: action.orders, loading: false, });
        case actionTypes.FETCH_ORDERS_FAIL:
            return updateObject(state, { loading: false, error: action.error });
        default: return state;
    }
};

export default reducer;