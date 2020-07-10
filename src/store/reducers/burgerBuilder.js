import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';
// import {merge} from 'lodash';

const initialState = {
    /* ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    }, */
    ingredients: null,
    bread: 0,
    totalPrice: 4,
    error: false
}

const ING_PRICES = {
    salad: 0.2,
    cheese: 0.3,
    meat: 1,
    bacon: 0.6,
    bread: 0.5,
}

const addIng = (state, action) => {
    if (action.ingName === 'bread') {
        return updateObject(
            state,
            { bread: state.bread + 1 },
            { totalPrice: state.totalPrice + ING_PRICES[action.ingName] });
    }
    else {
        return updateObject(
            state,
            {
                ingredients: updateObject(state.ingredients,
                    { [action.ingName]: state.ingredients[action.ingName] + 1 })
            },
            { totalPrice: state.totalPrice + ING_PRICES[action.ingName] });
    }
}

const remIng = (state, action) => {
    if (action.ingName === 'bread' && state.bread > 0) {
        return updateObject(
            state,
            { bread: state.bread - 1 },
            { totalPrice: state.totalPrice - ING_PRICES[action.ingName] });
    }
    else if (state.ingredients[action.ingName] > 0) {
        return updateObject(
            state,
            {
                ingredients: updateObject(state.ingredients,
                    { [action.ingName]: state.ingredients[action.ingName] - 1 })
            },
            { totalPrice: state.totalPrice - ING_PRICES[action.ingName] });
    }
    else return state;
}

const setIng = (state, action) => {
    let sumPrice = 4;
    for (let ing in action.ingredients) {
        if (action.ingredients[ing] > 0)
            sumPrice += ING_PRICES[ing];
    }
    sumPrice += state.bread * ING_PRICES['bread'];
    return updateObject(state,
        { ingredients: action.ingredients },
        { totalPrice: sumPrice },
        { error: false });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ING: return addIng(state, action);
        case actionTypes.REM_ING: return remIng(state, action);
        case actionTypes.SET_ING: return setIng(state, action);
        case actionTypes.FETCH_ING_FAILED: return updateObject(state, { error: true });
        default: return state;
    }
};

export default reducer;