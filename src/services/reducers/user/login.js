import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED
} from '../../actions/user/login'

const userLoginInitialState = {
  loginRequest: false,
  loginFailed: false,
  loginFailedMessage: null
}

export const userLoginReducer = (state = userLoginInitialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...userLoginInitialState,
        loginRequest: true
      }
    }    
    case LOGIN_SUCCESS: {
      return {
        ...userLoginInitialState
      }
    }
    case LOGIN_FAILED: {
      return {
        ...userLoginInitialState,
        loginFailed: true,
        loginFailedMessage: action.payload
      }
    }    
    default: {
      return state
    }
  }
}