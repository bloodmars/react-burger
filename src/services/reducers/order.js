import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAILED,
  ORDER_CLOSE,
} from '../actions/order'

const orderInitialState = {
  order: null,
  orderRequest: false,
  orderFailed: false
}

export const orderReducer = (state = orderInitialState, action) => {
  switch (action.type) {
    case ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      }
    }
    case ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true
      }
    }    
    case ORDER_SUCCESS: {
      return {
        orderRequest: false,
        orderFailed: false,
        order: action.payload
      }
    }   
    case ORDER_CLOSE: {
      return {
        ...state,
        order: null
      }
    }
    default: {
      return state;
    }
  }
};