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

export const setIngredients = (ing, building) => {
  return {
    type: actionTypes.SET_ING,
    ingredients: ing,
    building: building,
  };
};
