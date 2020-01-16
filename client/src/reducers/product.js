import {
  GET_SINGLE_PRODUCT,
} from '../actions/constants';

const initialState = {
  selectedProduct: null,
  loading: true,
	error: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
      case GET_SINGLE_PRODUCT:
      return {
        ...state,
        selectedProduct: payload,
        loading: false
      }
    default:
      return state;
  }
}