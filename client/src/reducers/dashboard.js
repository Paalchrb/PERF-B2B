import {
  GET_COMPANY,
  COMPANY_ERROR,
  GET_FAV_PRODUCTS,
  FAV_PRODUCTS_ERROR,
  GET_RECENT_PRODUCTS,
  RECENT_PRODUCTS_ERROR
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
    case GET_RECENT_PRODUCTS:
      return {
        ...state,
        products: payload,
        loading: false
      }
      case RECENT_PRODUCTS_ERROR:
        return {
          ...state,
          error: payload,
          products: null,
          loading: false
        }
      case GET_FAV_PRODUCTS:
        return {
          ...state,
          products: payload,
          loading: false
        }
      case FAV_PRODUCTS_ERROR:
        return {
          ...state,
          products: null,
          error: payload
        }
    default:
      return state;
  }
}