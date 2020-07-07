import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    bread: 0,
    totalPrice: 4,
}

const ING_PRICES = {
    salad: 0.2,
    cheese: 0.3,
    meat: 1,
    bacon: 0.6,
    bread: 0.5,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ING:
            if (action.ingName === 'bread') {
                return {
                    ...state,
                    bread: state.bread + 1,
                    totalPrice: state.totalPrice + ING_PRICES['bread']
                }
            }
            else {
                return {
                    ...state,
                    ingredients: {
                        ...state.ingredients,
                        [action.ingName]: state.ingredients[action.ingName] + 1,  
                    },
                    totalPrice: state.totalPrice + ING_PRICES[action.ingName]
                };
            };
        case actionTypes.REM_ING:
            if (action.ingName === 'bread' && state.bread > 0) {
                return {
                    ...state,
                    bread: state.bread - 1,
                    totalPrice: state.totalPrice - ING_PRICES['bread']
                };
            }
            else if (state.ingredients[action.ingName] > 0) {
                return {
                    ...state,
                    ingredients: {
                        ...state.ingredients,
                        [action.ingName]: state.ingredients[action.ingName] - 1,
                    },
                    totalPrice: state.totalPrice - ING_PRICES[action.ingName]
                }
            }
            break;
        default: return state;
    }
};

export default reducer;