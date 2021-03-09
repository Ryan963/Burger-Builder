import * as actionTypes from './actionTypes'
import axios from '../../axiosOrders'
export const addIngredient = (name) => {
    return {
        ingredientName: name,
        type: actionTypes.ADD_INGREDIENT
    }
}

export const removeIngredient = (name) => {
    return {
        ingredientName: name,
        type: actionTypes.REMOVE_INGREDIENT
    }
}

export const setIngredients = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://burger-builder-85660-default-rtdb.firebaseio.com/ingredients.json')
        .then(res => {
            dispatch(setIngredients(res.data));
        })
    }
}
