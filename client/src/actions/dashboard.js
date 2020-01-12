import axios from 'axios';

import {
  GET_COMPANY,
  COMPANY_ERROR,
  GET_FAV_PRODUCTS,
  FAV_PRODUCTS_ERROR,
  GET_RECENT_PRODUCTS,
  RECENT_PRODUCTS_ERROR,
  GET_RECENT_ORDERS,
  RECENT_ORDERS_ERROR
} from './constants';

const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWUxOWQ1MWNhMjNiYjYwYWNmZDFiM2ZkIiwiY29tcGFueUlkIjoiNWUxOWQ0ZWRhMjNiYjYwYWNmZDFiM2ZjIn0sImlhdCI6MTU3ODc3Mzg1NCwiZXhwIjoxNTgyMzczODU0fQ.8uyjcX_Aa4xpHKzZ11-1A3g3uyPb0Wp15JFIk2ro9rw';

//get user company
export const getMyCompany = () => async dispatch => {
  try {
    let config = {
      headers: {
        'x-auth-token': testToken,
      }
    }
    
    const company = await axios('/api/companies/me', config);
 
    dispatch({
      type: GET_COMPANY,
      payload: company.data
    });
  } catch (error) {
    dispatch({
      type: COMPANY_ERROR,
      payload: { 
        msg: error.response.statusText, 
        status: error.response.status 
      }
    });
  }
};

//get company recent products
export const getRecentProducts = () => async dispatch => {
  try {
    let config = {
      headers: {
        'x-auth-token': testToken,
      }
    }
    const company = await axios('api/companies/me', config);
   

    dispatch({
      type: GET_RECENT_PRODUCTS,
      payload: company.data
    })
  } catch (error) {
    dispatch({
      type: RECENT_PRODUCTS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

//get company favorite products
export const getFavoriteProducts = () => async dispatch => {
  try {
    let config = {
      headers: {
        'x-auth-token': testToken,
        'Content-Type': 'application/json'
      }
    }
    
    const favoriteProducts = await axios('api/products/favorites', config);

    console.log(favoriteProducts);

    dispatch({
      type: GET_FAV_PRODUCTS,
      payload: favoriteProducts
    })
  } catch (error) {
    dispatch({
      type: FAV_PRODUCTS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};