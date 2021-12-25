import {
  PATCH_USER_REQUEST,
  PATCH_USER_SUCCESS,
  PATCH_USER_FAILED
} from '../../actions/user/patch'

const userPatchInitialState = {
  userPatchRequest: false,
  userPatchFailed: false,
  userPatchFailedMessage: null
}

export const userPatchReducer = (state = userPatchInitialState, action) => {
  switch (action.type) {
    case PATCH_USER_REQUEST: {
      return {
        ...userPatchInitialState,
        userPatchRequest: true
      }
    }    
    case PATCH_USER_SUCCESS: {
      return {
        ...userPatchInitialState
      }
    }
    case PATCH_USER_FAILED: {
      return {
        ...userPatchInitialState,
        userPatchFailed: true,
        userPatchFailedMessage: action.payload
      }
    }    
    default: {
      return state
    }
  }
}