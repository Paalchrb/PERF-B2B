import axios from 'axios';

import { GET_PRODUCTS, PRODUCT_ERROR } from './constants';

//Get all products
export const getAllProducts = () => async dispatch => {
  try {
    const allProducts = await axios.get('/api/products');

    dispatch({
      type: GET_PRODUCTS,
      payload: allProducts.data
    });
    console.log(allProducts.data);

  } catch (error) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};