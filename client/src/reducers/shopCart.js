import {
  LOAD_CART_ERROR,
  ADD_TO_CART,
  UPDATE_ITEM_QUANTITY,
  ITEM_QUANTITY_ERROR,
  CREATE_NEW_ORDER,
  NEW_ORDER_ERROR
} from '../actions/constants';

const initialState = {
  shopCartItems: [],
  orders: [],
  orderCreated: false,
  isLoading: true,
  error: {}
};

//Check if product alreade exists in shop cart, and update quantity if it does.
const updateShopCartItems = (productArr, payload) => {
  const index = productArr.findIndex(product => product._id === payload._id);
  if (index !== -1) {
    productArr[index].quantity = +productArr[index].quantity + 1;
  } else {
    productArr.push(payload);
  }
  return productArr;
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_CART:
      const updatedShopCartItems = updateShopCartItems(state.shopCartItems, payload);
     
      return {
        ...state,
        shopCartItems: updatedShopCartItems,
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
      const shopCartArray = state.shopCartItems;
      const index = shopCartArray.findIndex(product => product._id === payload.productId);
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
    case CREATE_NEW_ORDER:
      return {
        ...state,
        orders: [
          ...state.orders,
          payload
        ],
        isLoading: false,
        orderCreated: true

      }
    case NEW_ORDER_ERROR:
        return {
          ...state,
          orders: [],
          error: payload,
          isLoading: false
        }
    default:
      return state;
  }
}