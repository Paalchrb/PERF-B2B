import axios from 'axios';
import {
  ADD_TO_CART_ERROR,
  ADD_TO_CART,
  UPDATE_ITEM_QUANTITY,
  ITEM_QUANTITY_ERROR,
  CREATE_NEW_ORDER,
  NEW_ORDER_ERROR
} from '../actions/constants';

// Load cart items:
// @TODO: MAKE CART MODEL IN DATABASE SO UNFINISHED CART CAN BE SAVED, AND DISPLAY WHEN USER LOGS IN.
// @TODO: CREATE LOAD CART ACTION

// Add item to cart:
export const addItemToCart = (productId, quantity = 1) => async dispatch => {
  try { 
    const product = await axios.get(`/api/products/${productId}`);
    const seller = await axios.get(`/api/companies/${product.data.companyId}`);
    
    const payload = {
      ...product.data,
      quantity,
      sellerName: seller.data.companyName
    };
    
    dispatch({
      type: ADD_TO_CART,
      payload
    });
  } catch (error) {
    
    dispatch({
      type: ADD_TO_CART_ERROR,
      payload: error
    });
  }
};

// Update shop cart item quantity
export const updateCartItemQuantity = (quantity, productId) => dispatch => {
  try {
    const payload = {
      productId,
      quantity
    };
    return dispatch({
      type: UPDATE_ITEM_QUANTITY,
      payload
    });
  } catch(error) {
    return dispatch({
      type: ITEM_QUANTITY_ERROR,
    });
  }
};

// Create and send new order
export const createNewOrders = (shopCartItems, token) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    }
  
    const body = {
      shopCartItems
    }
  
    const res = await axios.post('/api/orders', body, config);
    console.log(res);

    dispatch({
      type: CREATE_NEW_ORDER,
      payload: res.data
    })
  } catch(error) {
    console.error(error);
    dispatch({
      type: NEW_ORDER_ERROR,
      payload: error
    });
  }

}


