import {
  GET_ALL_ORDERS,
  GET_SINGLE_ORDER,
  ORDER_ERROR,
  SET_CURRENT_ORDER
} from '../actions/constants';

const initialState = {
  currentOrder: '',
	orders: [],
  loading: true,
	error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_ORDERS:
    case GET_SINGLE_ORDER:
      return {
        ...state,
        orders: payload,
        loading: false
      }
    case SET_CURRENT_ORDER:
      return {
        ...state,
        currentOrder: payload,
        loading: false
      }
    case ORDER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default:
      return state;
  }
}