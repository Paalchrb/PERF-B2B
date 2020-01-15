import axios from 'axios';
import {
  LOAD_CART_ERROR,
  ADD_TO_CART,
  UPDATE_ITEM_QUANTITY,
  ITEM_QUANTITY_ERROR
} from '../actions/constants';

// Load cart items:
// @TODO: MAKE CART MODEL IN DATABASE SO UNFINISHED CART CAN BE SAVED, AND DISPLAY WHEN USER LOGS IN.
// @TODO: CREATE LOAD CART ACTION

// Add item to cart:
export const addItemToCart = (token, productId, quantity = 1) => async dispatch => {
  try { 
    const config = {
      headers: {
        'x-auth-token': token
      }
    }
    const product = await axios.get(`/api/products/${productId}`, config);
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
      type: LOAD_CART_ERROR,
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



