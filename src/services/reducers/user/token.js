import {
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_FAILED
} from '../../actions/user/token'

const userTokenInitialState = {
  tokenRequest: false,
  tokenFailed: false,
  tokenFailedMessage: null
}

export const userTokenReducer = (state = userTokenInitialState, action) => {
  switch (action.type) {
    case TOKEN_REQUEST: {
      return {
        ...userTokenInitialState,
        tokenRequest: true
      }
    }    
    case TOKEN_SUCCESS: {
      return {
        ...userTokenInitialState
      }
    }
    case TOKEN_FAILED: {
      return {
        ...userTokenInitialState,
        tokenFailed: true,
        tokenFailedMessage: action.payload
      }
    }    
    default: {
      return state
    }
  }
}