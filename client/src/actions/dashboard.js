import axios from 'axios';

import {
  GET_COMPANY,
  COMPANY_ERROR,
  GET_FAV_PRODUCTS,
  FAV_PRODUCTS_ERROR,
  GET_RECENT_PRODUCTS,
  RECENT_PRODUCTS_ERROR,
  GET_RECENT_ORDERS,
  RECENT_ORDERS_ERROR,
} from './constants';

//get user company
export const getCurrentCompany = (token) => async dispatch => {
  try {
    let config = {
      headers: {
        'x-auth-token': token,
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
export const getRecentProducts = (token) => async dispatch => {
  try {
    let config = {
      headers: {
        'x-auth-token': token,
      }
    }
    const recentProducts = await axios('api/products/recent', config);

    dispatch({
      type: GET_RECENT_PRODUCTS,
      payload: recentProducts.data
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
export const getFavoriteProducts = (token) => async dispatch => {
  try {
    let config = {
      headers: {
        'x-auth-token': token,
      }
    }
    
    const favoriteProducts = await axios('api/products/favorites', config);

    dispatch({
      type: GET_FAV_PRODUCTS,
      payload: favoriteProducts.data
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

//get company recent orders
export const getRecentOrders = (token) => async dispatch => {
  try {
    let config = {
      headers: {
        'x-auth-token': token,
      }
    }
    
    const getRecentOrders = await axios('api/orders/procurement/recent', config);

    dispatch({
      type: GET_RECENT_ORDERS,
      payload: getRecentOrders.data
    })
  } catch (error) {
    dispatch({
      type: RECENT_ORDERS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};