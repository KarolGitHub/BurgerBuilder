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

export const setIng = () => {
    return dispatch => {
        axios.get('https://burger-builder-46554.firebaseio.com/ingredients.json')
            .then((response) => dispatch({
                type: actionTypes.SET_ING,
                ingredients: response.data
            }))
            .catch((error) => dispatch({
                type: actionTypes.FETCH_ING_FAILED,
            }))
    };
};