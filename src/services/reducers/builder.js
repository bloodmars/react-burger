import {
  BUILDER_SET_SIDE,
  BUILDER_ADD_ITEM,
  BUILDER_REMOVE_ITEM,
  REORDER_ITEM
} from '../actions/builder'

const builderInitialState = {
  side: null,
  ingredients: []
}

export const builderReducer = (state = builderInitialState, action) => {
  switch (action.type) {
    case BUILDER_SET_SIDE: {
      return {
        ...state,
        side: action.payload
      }
    }
    case BUILDER_ADD_ITEM: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      }
    }
    case BUILDER_REMOVE_ITEM: {
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient, index) => index !== action.payload)
      }
    }
    case REORDER_ITEM: {
      const dragCard = state.ingredients[action.payload.dragIndex]
      const ingredientsUpdated = state.ingredients
      ingredientsUpdated.splice(action.payload.dragIndex, 1)
      ingredientsUpdated.splice(action.payload.hoverIndex, 0, dragCard)
      return {
        ...state,
        ingredients: ingredientsUpdated
      }
    } 
    default: {
      return state;
    }
  }
};