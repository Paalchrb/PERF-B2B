import {
  GET_COMPANY,
  COMPANY_ERROR,
  GET_PRODUCTS,
  PRODUCT_ERROR
} from '../actions/constants';

const initialState = {
	company: null,
  user: null,
  products: [],
  orders: [],
  loading: true,
	error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_COMPANY:
      return {
        ...state,
        company: payload,
        loading: false
      }
    case COMPANY_ERROR:
      return {
        ...state,
        error: payload,
        company: null,
        loading: false
      }
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
        loading: false
      }
      case PRODUCT_ERROR:
        return {
          ...state,
          error: payload,
          products: null,
          loading: false
        }
    default:
      return state;
  }
}