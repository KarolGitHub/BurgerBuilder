import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  ingredients: null,
  ingredientsPrices: null,
  bread: 0,
  amount: 1,
  totalPrice: 4,
  error: false,
  building: false,
};

const addIng = (state, action) => {
  if (action.ingName === "amount") {
    return updateObject(state, {
      amount: state.amount + 1,
      totalPrice: (state.amount + 1) * (state.totalPrice / state.amount),
      building: true,
    });
  } else if (action.ingName === "bread") {
    return updateObject(state, {
      bread: state.bread + 1,
      totalPrice:
        state.totalPrice +
        state.amount * state.ingredientsPrices[action.ingName],
      building: true,
    });
  } else {
    return updateObject(state, {
      ingredients: updateObject(state.ingredients, {
        [action.ingName]: state.ingredients[action.ingName] + 1,
      }),
      totalPrice:
        state.totalPrice +
        state.amount * state.ingredientsPrices[action.ingName],
      building: true,
    });
  }
};

const remIng = (state, action) => {
  if (action.ingName === "amount" && state.amount > 1) {
    return updateObject(state, {
      amount: state.amount - 1,
      totalPrice: (state.amount - 1) * (state.totalPrice / state.amount),
      building: true,
    });
  } else if (action.ingName === "bread" && state.bread > 0) {
    return updateObject(state, {
      bread: state.bread - 1,
      totalPrice:
        state.totalPrice -
        state.amount * state.ingredientsPrices[action.ingName],
      building: true,
    });
  } else if (state.ingredients[action.ingName] > 0) {
    return updateObject(state, {
      ingredients: updateObject(state.ingredients, {
        [action.ingName]: state.ingredients[action.ingName] - 1,
      }),
      totalPrice:
        state.totalPrice -
        state.amount * state.ingredientsPrices[action.ingName],
      building: true,
    });
  } else return state;
};

const setIng = (state, action) => {
  if (action.building) {
    return state;
  } else {
    let sumPrice = 4;
    for (let ing in action.ingredients) {
      if (action.ingredients[ing] > 0)
        sumPrice += action.ingredientsPrices[ing];
    }
    sumPrice =
      state.amount *
      (sumPrice + state.bread * action.ingredientsPrices["bread"]);
    return updateObject(state, {
      ingredients: {
        salad: action.ingredients.salad,
        bacon: action.ingredients.bacon,
        cheese: action.ingredients.cheese,
        meat: action.ingredients.meat,
      },
      ingredientsPrices: {
        salad: action.ingredientsPrices.salad,
        bacon: action.ingredientsPrices.bacon,
        cheese: action.ingredientsPrices.cheese,
        meat: action.ingredientsPrices.meat,
        bread: action.ingredientsPrices.bread,
      },
      totalPrice: sumPrice,
      error: false,
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ING:
      return addIng(state, action);
    case actionTypes.REM_ING:
      return remIng(state, action);
    case actionTypes.SET_ING:
      return setIng(state, action);
    case actionTypes.FETCH_ING_FAILED:
      return updateObject(state, { error: action.error });
    default:
      return state;
  }
};

export default reducer;
