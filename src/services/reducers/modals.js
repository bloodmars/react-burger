import {
  SHOW_INGREDIENT_DETAILS,
  HIDE_INGREDIENT_DETAILS
} from '../actions/modals'

const modalsInitialState = {
  ingredientDetails: null
}

export const modalsReducer = (state = modalsInitialState, action) => {
  switch (action.type) {
    case SHOW_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: action.payload
      }
    }
    case HIDE_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: null
      }
    }    
    default: {
      return state;
    }
  }
};