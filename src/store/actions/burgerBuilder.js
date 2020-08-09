import * as actionTypes from "./actionsTypes";

export const addIng = (name) => {
  return {
    type: actionTypes.ADD_ING,
    ingName: name,
  };
};

export const remIng = (name) => {
  return {
    type: actionTypes.REM_ING,
    ingName: name,
  };
};

export const fetchIngFail = (error, building) => {
  return {
    type: actionTypes.FETCH_ING_FAILED,
    error: error,
    building: building,
  };
};

export const setIng = (building) => {
  return {
    type: actionTypes.SET_INGREDIENT,
    building: building,
  };
};

export const initIng = (building) => {
  return {
    type: actionTypes.SET_ING,
    building: building,
  };
};

export const setIngredients = (ing, prices, building) => {
  return {
    type: actionTypes.SET_ING,
    ingredients: ing,
    ingredientsPrices: prices,
    building: building,
  };
};

export const addBurger = () => {
  return {
    type: actionTypes.ADD_BURGER,
  };
};

export const rebuildBurger = (id) => {
  return {
    type: actionTypes.REBUILD_BURGER,
    id: id,
  };
};

export const deleteBurger = (id) => {
  return {
    type: actionTypes.DELETE_BURGER,
    id: id,
  };
};

export const purchaseBurgerEnd = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_END,
  };
};
