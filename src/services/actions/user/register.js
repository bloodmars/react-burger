import { API_BASE_URL } from 'services/api'
import { setCookie, checkResponse } from 'services/utils'

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILED = 'REGISTER_FAILED'

export function postRegister(formData) {
  return function(dispatch) {
    dispatch({
      type: REGISTER_REQUEST
    })

    fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)      
    })
    .then(checkResponse)
    .then(data => {
      setCookie('accessToken', data.accessToken)
      setCookie('refreshToken', data.refreshToken)
      return data
    })    
    .then(data => dispatch({
      type: REGISTER_SUCCESS, 
      payload: data
    }))
    .catch(error => dispatch({
      type: REGISTER_FAILED,
      payload: error.message
    }))
  }
}