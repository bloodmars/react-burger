import { API_BASE_URL } from 'services/api'
import { setCookie } from 'services/utils'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'

export function postLogin(formData) {
  return function(dispatch) {
    dispatch({
      type: LOGIN_REQUEST
    })

    fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)      
    })
    .then(async response => {
      if (response.ok) {
        return response.json()
      } else {
        let message = 'Something went wrong'
        try {
          const responseJson = await response.json()
          message = responseJson.message
        } catch(e) {}
        throw new Error(message)
      }
    })
    .then(data => {
      setCookie('accessToken', data.accessToken)
      setCookie('refreshToken', data.refreshToken)
      return data
    })
    .then(data => dispatch({
      type: LOGIN_SUCCESS, 
      payload: data
    }))
    .catch(error => dispatch({
      type: LOGIN_FAILED,
      payload: error.message
    }))
  }
}