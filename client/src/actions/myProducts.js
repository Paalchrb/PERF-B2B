import axios from 'axios';

import { GET_COMPANY_PRODUCTS, COMPANY_PRODUCTS_ERROR } from './constants';

//Get products by company ID
export const getProductsByCompanyId = (token) => async dispatch => {


  try {
    const config = {
      headers: {
        "x-auth-token": token
      }
    }
    const companyProducts = await axios.get('/api/products/me', config);

    dispatch({
      type: GET_COMPANY_PRODUCTS,
      payload: companyProducts.data
    });

  } catch (error) {
    dispatch({
      type: COMPANY_PRODUCTS_ERROR,
      payload: error
    });
  }
};