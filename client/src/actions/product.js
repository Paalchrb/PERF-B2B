import axios from 'axios';

import {
  GET_SINGLE_PRODUCT
} from '../actions/constants';


//Get product by id
export let getProductById = (productId) => async dispatch => {
  try {

    let res = await axios(`/api/products/${productId}`); 

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
