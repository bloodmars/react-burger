import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED
} from '../../actions/user/register'

const userRegisterInitialState = {
  registerRequest: false,
  registerFailed: false,
  registerFailedMessage: null
}

export const userRegisterReducer = (state = userRegisterInitialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...userRegisterInitialState,
        registerRequest: true
      }
    }    
    case REGISTER_SUCCESS: {
      return {
        ...userRegisterInitialState
      }
    }
    case REGISTER_FAILED: {
      return {
        ...userRegisterInitialState,
        registerFailed: true,
        registerFailedMessage: action.payload
      }
    }    
    default: {
      return state
    }
  }
}