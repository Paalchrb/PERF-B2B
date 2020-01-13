import axios from 'axios';
import {
  //LOAD_CART,
  LOAD_CART_ERROR,
  ADD_TO_CART,
  /* REMOVE_FROM_CART,
  UPDATE_CART,
  CONFIRM_PURCHASE,
  PURCHASE_ERROR, */
} from '../actions/constants';

// Load cart items:
// @TODO: MAKE CART MODEL IN DATABASE SO UNFINISHED CART CAN BE SAVED, AND DISPLAY WHEN USER LOGS IN.
// @TODO: CREATE LOAD CART ACTION


// Add item to cart:
export const addItemToCart = (token, productId, quantity) => async dispatch => {
  try { 
    const config = {
      headers: {
        'x-auth-token': token
      }
    }
    const product = await axios.get(`/api/products/${productId}`, config);
    const seller = await axios.get(`/api/companies/${product.data.companyId}`);
    console.log(product, seller);

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
      payload: { 
     /*    msg: error.response.statusText, 
        status: error.response.status  */
      }
    });
  }
}
