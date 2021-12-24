import { API_BASE_URL } from 'services/api';

export const FORGOT_REQUEST = 'FORGOT_REQUEST'
export const FORGOT_SUCCESS = 'FORGOT_SUCCESS'
export const FORGOT_FAILED = 'FORGOT_FAILED'

export const RESET_REQUEST = 'RESET_REQUEST'
export const RESET_SUCCESS = 'RESET_SUCCESS'
export const RESET_FAILED = 'RESET_FAILED'
export const RESET_DONE = 'RESET_DONE'

export function postForgot(formData) {
  return function(dispatch) {
    dispatch({
      type: FORGOT_REQUEST
    })

    fetch(`${API_BASE_URL}/password-reset`, {
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
    .then(data => dispatch({
      type: FORGOT_SUCCESS
    }))
    .catch(error => dispatch({
      type: FORGOT_FAILED,
      payload: error.message
    }))
  }
}

export function postReset(formData) {
  return function(dispatch) {
    dispatch({
      type: RESET_REQUEST
    })

    fetch(`${API_BASE_URL}/password-reset/reset`, {
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
    .then(data => dispatch({
      type: RESET_SUCCESS
    }))
    .catch(error => dispatch({
      type: RESET_FAILED,
      payload: error.message
    }))
  }
}