import { GET_PRODUCTS, PRODUCT_ERROR } from './constants';

const initialState = {
  allProducts: [],
  loading: true,
	error: {}
};

export default function(state= initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case GET_PRODUCTS:
      return {
        ...state,
        allProducts: payload,
        loading: false
      }
    case PRODUCT_ERROR:
      return {
        ...state,
        error: payload,
        allProducts: [],
        loading: false
      }
    default:
      return state;
  };
};