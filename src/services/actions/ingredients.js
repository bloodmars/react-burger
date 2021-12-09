import { API_BASE_URL } from '../api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'
export const SHOW_INGREDIENT_DETAILS = 'SHOW_INGREDIENT_DETAILS'
export const HIDE_INGREDIENT_DETAILS = 'HIDE_INGREDIENT_DETAILS'

export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    })

    fetch(`${API_BASE_URL}/ingredients`)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Something went wrong')
      }
    })
    .then(data => dispatch({
      type: GET_INGREDIENTS_SUCCESS, 
      payload: data.data 
    }))
    .catch(error => dispatch({
      type: GET_INGREDIENTS_FAILED
    }))
  }
}