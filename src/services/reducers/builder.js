import {
  BUILDER_SET_BUN,
  BUILDER_ADD_ITEM,
  BUILDER_REMOVE_ITEM,
  REORDER_ITEM
} from '../actions/builder'

const builderInitialState = {
  builderBun: null,
  builderIngredients: []
}

export const builderReducer = (state = builderInitialState, action) => {
  switch (action.type) {
    case BUILDER_SET_BUN: {
      return {
        ...state,
        builderBun: action.payload
      }
    }
    case BUILDER_ADD_ITEM: {
      return {
        ...state,
        builderIngredients: [...state.builderIngredients, action.payload]
      }
    }
    case BUILDER_REMOVE_ITEM: {
      return {
        ...state,
        builderIngredients: state.builderIngredients.filter((ingredient, index) => index !== action.payload)
      }
    }
    case REORDER_ITEM: {
      const dragCard = state.builderIngredients[action.payload.dragIndex]
      const ingredientsUpdated = [...state.builderIngredients]
      ingredientsUpdated.splice(action.payload.dragIndex, 1)
      ingredientsUpdated.splice(action.payload.hoverIndex, 0, dragCard)
      return {
        ...state,
        builderIngredients: ingredientsUpdated
      }
    } 
    default: {
      return state;
    }
  }
};