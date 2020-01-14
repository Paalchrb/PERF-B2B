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
      return {
        ...state,
        shopCartItems: [
          ...state.shopCartItems,
          payload
        ],
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
      const shopCartArray = state.shopCartItems;
      const index = shopCartArray.findIndex(product => product._id === payload.productId);
      shopCartArray[index].quantity = payload.quantity;
      return {
        ...state,
        shopCartItems: shopCartArray,
        isLoading: false
      }
    case ITEM_QUANTITY_ERROR:
    default:
      return state;
  }
}