import { combineReducers } from 'redux'
import { ingredientsReducer } from './ingredients'
import { orderReducer } from './order'
import { modalsReducer } from './modals'
import { builderReducer } from './builder'

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  builder: builderReducer,
  order: orderReducer,
  modals: modalsReducer
});