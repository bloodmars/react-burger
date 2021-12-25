import {
  FORGOT_REQUEST,
  FORGOT_SUCCESS,
  FORGOT_FAILED,
  RESET_REQUEST,
  RESET_SUCCESS,
  RESET_FAILED,
  RESET_DONE
} from '../../actions/user/reset'

const userResetInitialState = {
  resetStep: null,
  forgotRequest: false,
  forgotFailed: false,
  forgotFailedMessage: null,
  resetRequest: false,
  resetFailed: false,
  resetFailedMessage: null
}

export const userResetReducer = (state = userResetInitialState, action) => {
  switch (action.type) {
    case FORGOT_REQUEST: {
      return {
        ...userResetInitialState,
        forgotRequest: true
      }
    }    
    case FORGOT_SUCCESS: {
      return {
        ...userResetInitialState,
        resetStep: 1
      }
    }
    case FORGOT_FAILED: {
      return {
        ...userResetInitialState,
        forgotFailed: true,
        forgotFailedMessage: action.payload
      }
    }  
    case RESET_REQUEST: {
      return {
        ...userResetInitialState,
        resetStep: 1,
        resetRequest: true
      }
    }    
    case RESET_SUCCESS: {
      return {
        ...userResetInitialState,
        resetStep: 2,
        resetSuccess: true
      }
    }
    case RESET_FAILED: {
      return {
        ...userResetInitialState,
        resetStep: 1,
        resetFailed: true,
        resetFailedMessage: action.payload
      }
    }
    case RESET_DONE: {
      return {
        ...userResetInitialState
      }
    }
    default: {
      return state
    }
  }
}