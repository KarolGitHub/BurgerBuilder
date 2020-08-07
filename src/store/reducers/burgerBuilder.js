import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  ingredients: null,
  order: [],
  ingredientsPrices: null,
  amount: 1,
  burgerPrice: 4,
  totalPrice: 0,
  error: false,
  building: false,
  loading: false,
};

const addIng = (state, action) => {
  if (action.ingName === "amount") {
    return updateObject(state, {
      amount: state.amount + 1,
      burgerPrice: (state.amount + 1) * (state.burgerPrice / state.amount),
      building: true,
    });
  } else {
    return updateObject(state, {
      ingredients: updateObject(state.ingredients, {
        [action.ingName]: state.ingredients[action.ingName] + 1,
      }),
      burgerPrice:
        state.burgerPrice +
        state.amount * state.ingredientsPrices[action.ingName],
      building: true,
    });
  }
};

const remIng = (state, action) => {
  if (action.ingName === "amount" && state.amount > 1) {
    return updateObject(state, {
      amount: state.amount - 1,
      burgerPrice: (state.amount - 1) * (state.burgerPrice / state.amount),
      building: true,
    });
  } else if (state.ingredients[action.ingName] > 0) {
    return updateObject(state, {
      ingredients: updateObject(state.ingredients, {
        [action.ingName]: state.ingredients[action.ingName] - 1,
      }),
      burgerPrice:
        state.burgerPrice -
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

    return updateObject(state, {
      ingredients: {
        salad: action.ingredients.salad,
        bacon: action.ingredients.bacon,
        bread: action.ingredients.bread,
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
      burgerPrice: sumPrice,
      error: false,
    });
  }
};

const addBurger = (state) => {
  return updateObject(state, {
    order: state.order.concat({
      ingredients: updateObject(state.ingredients),
      burgerPrice: state.burgerPrice,
      amount: state.amount,
    }),
    totalPrice: state.totalPrice + state.burgerPrice,
  });
};

const rebuildBurger = (state, action) => {
  const currBurger = { ...state.order[action.id] };
  return updateObject(state, {
    order: state.order.filter((_, index) => index !== +action.id),
    ingredients: updateObject(currBurger.ingredients),
    amount: currBurger.amount,
    totalPrice: state.totalPrice - currBurger.burgerPrice,
    burgerPrice: currBurger.burgerPrice,
  });
};

const deleteBurger = (state, action) => {
  const currBurger = { ...state.order[action.id] };
  return updateObject(state, {
    order: state.order.filter((_, index) => index !== +action.id),
    totalPrice: state.totalPrice - currBurger.burgerPrice,
  });
};

const purchaseEnd = () => {
  return updateObject(initialState, { building: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ING:
      return addIng(state, action);
    case actionTypes.REM_ING:
      return remIng(state, action);
    case actionTypes.SET_ING:
      return setIng(state, action);
    case actionTypes.ADD_BURGER:
      return addBurger(state);
    case actionTypes.REBUILD_BURGER:
      return rebuildBurger(state, action);
    case actionTypes.DELETE_BURGER:
      return deleteBurger(state, action);
    case actionTypes.PURCHASE_END:
      return purchaseEnd();
    case actionTypes.FETCH_ING_FAILED:
      return updateObject(state, { error: action.error });
    default:
      return state;
  }
};

export default reducer;
