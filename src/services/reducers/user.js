import { USER_SKIP_REQUEST } from '../actions/user'
import { REGISTER_SUCCESS } from '../actions/user/register'
import { LOGIN_SUCCESS } from '../actions/user/login'
import { LOGOUT_SUCCESS } from '../actions/user/logout'
import { TOKEN_FAILED } from '../actions/user/token'
import { GET_USER_SUCCESS } from '../actions/user/get'
import { PATCH_USER_SUCCESS } from '../actions/user/patch'

const userInitialState = {
  isInitRequested: false,
  isAuth: false,
  name: null,
  email: null,
  accessToken: null,
  refreshToken: null
}

export const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case USER_SKIP_REQUEST: {
      return {
        ...userInitialState,
        isInitRequested: true
      }
    }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case GET_USER_SUCCESS:
    case PATCH_USER_SUCCESS: {
      return {
        isAuth: true,
        isInitRequested: true,
        name: action.payload.user.name,
        email: action.payload.user.email,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      }
    }
    case TOKEN_FAILED:
    case LOGOUT_SUCCESS: {
      return {
        ...userInitialState,
        isInitRequested: true
      }
    }
    default: {
      return state;
    }
  }
}