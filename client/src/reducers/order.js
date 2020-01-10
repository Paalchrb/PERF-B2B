import {
  GET_ORDER,
  ORDER_ERROR
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
    default:
      return state;
  }
}