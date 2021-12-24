import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED
} from '../../actions/user/logout'

const userLogoutInitialState = {
  logoutRequest: false,
  logoutFailed: false,
  logoutFailedMessage: null
}

export const userLogoutReducer = (state = userLogoutInitialState, action) => {
  switch (action.type) {
    case LOGOUT_REQUEST: {
      return {
        ...userLogoutInitialState,
        logoutRequest: true
      }
    }    
    case LOGOUT_SUCCESS: {
      return {
        ...userLogoutInitialState
      }
    }
    case LOGOUT_FAILED: {
      return {
        ...userLogoutInitialState,
        logoutFailed: true,
        logoutFailedMessage: action.payload
      }
    }    
    default: {
      return state
    }
  }
}