import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'

const INGREDIENT_PRICES = {
    lettuse: 0.5,
    cheese: 0.5,
    bacon: 1.0,
    meat: 1.5
}

const initialState = {
    ingredients: null,
        totalPrice: 4
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case (actionTypes.ADD_INGREDIENT):
            const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] < 3 
                                        ? state.ingredients[action.ingredientName] + 1
                                        : state.ingredients[action.ingredientName]}
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state, updatedState)
        case (actionTypes.REMOVE_INGREDIENT):
            return {
                ...state, ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] > 0
                    ? state.ingredients[action.ingredientName] - 1 
                    : state.ingredients[action.ingredientName]
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        case (actionTypes.SET_INGREDIENTS):
            return updateObject(state, {
                ingredients: {
                    lettuse: action.ingredients.lettuse,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: 4
            })
        default:
            return state 
    }
}

export default reducer