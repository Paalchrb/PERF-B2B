import axios from 'axios';

import {
  GET_SINGLE_PRODUCT
} from '../actions/constants';


//Get user product by id
export const getProductById = (token, productId) => async dispatch => {
  try {
    let config = {
      headers: {
        'x-auth-token': token
      }
    }
    
    const res = await axios(`/api/orders/${productId}`, config); 

    dispatch({
      type: GET_SINGLE_PRODUCT,
      payload: res.data
    });
  } catch (error) {
    console.log('There was an an error retrieving your product');
    // dispatch({
    //   type: ORDER_ERROR,
    //   payload: { 
    //     msg: error.response.statusText, 
    //     status: error.response.status 
    //   }
    // });
  }
};
