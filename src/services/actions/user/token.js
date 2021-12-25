import { API_BASE_URL } from 'services/api';
import { setCookie, getCookie, checkResponse } from 'services/utils'

export const TOKEN_REQUEST = 'TOKEN_REQUEST'
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS'
export const TOKEN_FAILED = 'TOKEN_FAILED'

export function refreshToken(callback) {
  return function(dispatch) {
    dispatch({
      type: TOKEN_REQUEST
    })

    fetch(`${API_BASE_URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },  
      body: JSON.stringify({token: getCookie('refreshToken')})
    })
    .then(checkResponse)
    .then(data => {
      setCookie('accessToken', data.accessToken)
      setCookie('refreshToken', data.refreshToken)
      return data
    })    
    .then(data => {
      dispatch(callback)
      dispatch({
        type: TOKEN_SUCCESS, 
        payload: data
      })
    })
    .catch(error => dispatch({
      type: TOKEN_FAILED,
      payload: error.message
    }))
  }
}