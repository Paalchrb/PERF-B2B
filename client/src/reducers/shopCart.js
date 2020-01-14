import {
  LOAD_CART_ERROR,
  ADD_TO_CART,
  UPDATE_ITEM_QUANTITY,
  ITEM_QUANTITY_ERROR
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
      //check if product already in cart:
      let shopCartArray = state.shopCartItems;
      let index = shopCartArray.findIndex(product => product._id === payload._id);
      if (index !== -1) {
        shopCartArray[index].quantity = +shopCartArray[index].quantity + 1;
      } else {
        shopCartArray.push(payload);
      }
    
      return {
        ...state,
        shopCartItems: shopCartArray,
        isLoading: false
      };
    case LOAD_CART_ERROR:
      return {
        ...state,
        isLoading: false,
        shopCartItems: [],
        error: payload
      }
    case UPDATE_ITEM_QUANTITY:
      // update quantity at selected item
      shopCartArray = state.shopCartItems;
      index = shopCartArray.findIndex(product => product._id === payload.productId);
      shopCartArray[index].quantity = payload.quantity;

      return {
        ...state,
        shopCartItems: shopCartArray,
        isLoading: false
      }
    case ITEM_QUANTITY_ERROR:
      return {
        ...state,
        error: payload,
        isLoading: false
      }
    default:
      return state;
  }
}