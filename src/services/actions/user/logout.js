import { API_BASE_URL } from 'services/api'
import { getCookie, deleteCookie, checkResponse } from 'services/utils'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILED = 'LOGOUT_FAILED'

export function logoutUser() {
  return function(dispatch) {
    dispatch({
      type: LOGOUT_REQUEST
    })

    fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token: getCookie('refreshToken')})
    })
    .then(checkResponse)
    .then(data => {
      deleteCookie('accessToken')
      deleteCookie('refreshToken')
      return data
    })     
    .then(data => dispatch({
      type: LOGOUT_SUCCESS, 
      payload: data
    }))
    .catch(error => dispatch({
      type: LOGOUT_FAILED,
      payload: error.message
    }))
  }
}