import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from '../actions/ingredients'

const ingredientsInitialState = {
  ingredients: [],
  isIngredientsGetLoading: false,
  isIngredientsGetFailed: false
}

export const ingredientsReducer = (state = ingredientsInitialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isIngredientsGetLoading: true
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...ingredientsInitialState,
        isIngredientsGetFailed: true
      }
    }    
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        isIngredientsGetLoading: false,
        isIngredientsGetFailed: false,
        ingredients: action.payload
      }
    } 
    default: {
      return state;
    }
  }
};