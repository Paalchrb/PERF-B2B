import {
  GET_ORDER,
  ORDER_ERROR,
  LOGOUT
} from '../actions/constants';

const initialState = {
	order: null,
  loading: true,
	error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ORDER:
      return {
        ...state,
        order: payload,
        loading: false
      }
    case ORDER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    case LOGOUT:
      return initialState
    default:
      return state;
  }
}