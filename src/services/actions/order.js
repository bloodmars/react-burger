import { API_BASE_URL } from 'services/api';

export const ORDER_REQUEST = 'ORDER_REQUEST'
export const ORDER_SUCCESS = 'ORDER_SUCCESS'
export const ORDER_FAILED = 'ORDER_FAILED'
export const ORDER_CLOSE = 'ORDER_CLOSE'

export function postOrder(ingredients) {
  return function(dispatch) {
    dispatch({
      type: ORDER_REQUEST
    })

    fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ingredients })      
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Something went wrong')
      }
    })
    .then(data => dispatch({
      type: ORDER_SUCCESS, 
      payload: data.order
    }))
    .catch(error => dispatch({
      type: ORDER_FAILED
    }))
  }
}