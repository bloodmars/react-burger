import { API_BASE_URL } from 'services/api'
import { getCookie, checkResponse } from 'services/utils'
import { refreshToken } from './token'

import { USER_SKIP_REQUEST } from '../user'

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAILED = 'GET_USER_FAILED'

export function getUser() {
  return function(dispatch) {
    if (!getCookie('accessToken')) {
      dispatch({
        type: USER_SKIP_REQUEST
      })

      return
    }

    dispatch({
      type: GET_USER_REQUEST
    })

    fetch(`${API_BASE_URL}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: getCookie('accessToken')
      }    
    })
    .then(checkResponse)
    .then(data => dispatch({
      type: GET_USER_SUCCESS, 
      payload: data
    }))
    .catch(error => {
      if (error.message === 'jwt expired') {
        dispatch(refreshToken(getUser()))
      } else {
        dispatch({
          type: GET_USER_FAILED,
          payload: error.message
        })
      }
    })
  }
}