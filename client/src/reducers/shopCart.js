import {
  LOAD_CART,
  LOAD_CART_ERROR,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART,
  CONFIRM_PURCHASE,
  PURCHASE_ERROR,
} from '../actions/constants';

const initialState = {
  shopCartItems: [],
  isLoading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_CART:
      return {
        ...state,
        shopCartItems: [
          ...state.shopCartItems,
          payload
        ],
        isLoading: false
      };
    case CONFIRM_PURCHASE:
      return {
        ...state,
        shopCartItems: [],
        isLoading: false,
      }
    case LOAD_CART_ERROR:
      return {
        ...state,
        isLoading: false,
        shopCartItems: [],
        error: payload
      }
    case PURCHASE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload
      }
    case REMOVE_FROM_CART:
    case UPDATE_CART:
      return{
        ...state,
        isloading: false,
        shopCartItems: payload
      }
    case LOAD_CART:
    default:
      return state;
  }
}