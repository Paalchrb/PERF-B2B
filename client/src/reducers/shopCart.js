import {
  LOAD_CART_ERROR,
  ADD_TO_CART,
  UPDATE_ITEM_QUANTITY,
  ITEM_QUANTITY_ERROR,
  CREATE_NEW_ORDER,
  NEW_ORDER_ERROR,
  LOGOUT,
} from '../actions/constants';

const initialState = {
  shopCartItems: [],
  orders: [],
  orderCreated: false,
  loading: true,
  error: {}
};

<<<<<<< HEAD
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

export default function(_state = initialState, action) {
  const state = JSON.parse(JSON.stringify(_state));
=======
export default function(state=initialState, action) {
>>>>>>> 0972a92d5aaed59920abe7b5702b6c4a1c42a5cf
  const { type, payload } = action;
  switch (type) {
    case LOGOUT:
      return initialState;
<<<<<<< HEAD

=======
>>>>>>> 0972a92d5aaed59920abe7b5702b6c4a1c42a5cf
    case ADD_TO_CART:
      let index = state.shopCartItems.findIndex(product => product._id === payload._id);
      let updatedCartItems = []
      if (index !== -1) {
        updatedCartItems = [
          ...state.shopCartItems.slice(0, index),
        {
          ...state.shopCartItems[index],
          quantity: payload.quantity++
        },
        ...state.shopCartItems.slice(index + 1)
        ]
      } else {
        updatedCartItems = payload
      }
      return {
        ...state,
        shopCartItems: updatedCartItems,
        loading: false
      };
    case LOAD_CART_ERROR:
      return {
        ...state,
        loading: false,
        shopCartItems: [],
        error: payload
      }
    case UPDATE_ITEM_QUANTITY:
      // update quantity at selected item
      index = state.shopCartItems.findIndex(product => product._id === payload.productId);
      
      updatedCartItems = [
        ...state.shopCartItems.slice(0, index),
        {
          ...state.shopCartItems[index],
          quantity: payload.quantity
        },
        ...state.shopCartItems.slice(index + 1)
      ];

      return {
        ...state,
        shopCartItems: updatedCartItems,
        loading: false
      }
    case ITEM_QUANTITY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    case CREATE_NEW_ORDER:
      return {
        ...state,
        orders: [
          ...state.orders,
          payload
        ],
        loading: false,
        orderCreated: true

      }
    case NEW_ORDER_ERROR:
        return {
          ...state,
          orders: [],
          error: payload,
          loading: false
        }
    default:
      return state;
  }
}