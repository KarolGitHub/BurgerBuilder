import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

export const addIng = (name) => {
    return {
        type: actionTypes.ADD_ING,
        ingName: name
    };
};

export const remIng = (name) => {
    return {
        type: actionTypes.REM_ING,
        ingName: name
    };
};

export const setIng = (building) => {
    return dispatch => {
        if (building) {
            dispatch({
                type: actionTypes.SET_ING,
                building: building
            })
        }
        else {
            axios.get('https://burger-builder-46554.firebaseio.com/ingredients.json')
                .then((response) => dispatch({
                    type: actionTypes.SET_ING,
                    ingredients: response.data,
                    building: building
                }))
                .catch((error) => dispatch({
                    type: actionTypes.FETCH_ING_FAILED,
                    error: error,
                    building: building
                }))
        }
    };
};