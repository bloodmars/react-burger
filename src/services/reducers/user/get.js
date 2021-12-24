import { getCookie } from 'services/utils'

import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED
} from '../../actions/user/get'

const userGetInitialState = {
  userGetRequest: false,
  userGetFailed: false,
  userGetFailedMessage: null
}

export const userGetReducer = (state = userGetInitialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return {
        ...userGetInitialState,
        userGetRequest: true
      }
    }    
    case GET_USER_SUCCESS: {
      return {
        ...userGetInitialState
      }
    }
    case GET_USER_FAILED: {
      return {
        ...userGetInitialState,
        userGetFailed: true,
        userGetFailedMessage: action.payload
      }
    }    
    default: {
      return state
    }
  }
}