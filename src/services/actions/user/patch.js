import { API_BASE_URL } from 'services/api'
import { getCookie, checkResponse } from 'services/utils'
import { refreshToken } from './token'

export const PATCH_USER_REQUEST = 'PATCH_USER_REQUEST'
export const PATCH_USER_SUCCESS = 'PATCH_USER_SUCCESS'
export const PATCH_USER_FAILED = 'PATCH_USER_FAILED'

export function patchUser(formData) {
  return function(dispatch) {
    dispatch({
      type: PATCH_USER_REQUEST
    })

    fetch(`${API_BASE_URL}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: getCookie('accessToken')
      },
      body: JSON.stringify(formData)      
    })
    .then(checkResponse)
    .then(data => dispatch({
      type: PATCH_USER_SUCCESS, 
      payload: data
    }))
    .catch(error => {
      if (error.message === 'jwt expired') {
        dispatch(refreshToken(patchUser()))
      } else {
        dispatch({
          type: PATCH_USER_FAILED,
          payload: error.message
        })
      }
    })
  }
}