import { combineReducers } from 'redux'
import { ingredientsReducer } from './ingredients'
import { orderReducer } from './order'
import { builderReducer } from './builder'
import { userReducer } from './user'
import { userRegisterReducer } from './user/register'
import { userLoginReducer } from './user/login'
import { userResetReducer } from './user/reset'
import { userLogoutReducer } from './user/logout'
import { userTokenReducer } from './user/token'
import { userGetReducer } from './user/get'
import { userPatchReducer } from './user/patch'

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  builder: builderReducer,
  order: orderReducer,
  user: userReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userReset: userResetReducer,
  userLogout: userLogoutReducer,
  userToken: userTokenReducer,
  userGet: userGetReducer,
  userPatch: userPatchReducer
})