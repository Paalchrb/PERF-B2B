import axios from 'axios';

import {
  GET_COMPANY,
  COMPANY_ERROR,
  GET_FAV_PRODUCTS,
  FAV_PRODUCTS_ERROR,
  GET_RECENT_PRODUCTS,
  RECENT_PRODUCTS_ERROR
} from './constants';

//get user company
export const getMyCompany = () => async dispatch => {
  try {
    let config = {
      headers: {
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWUxOWQ1MWNhMjNiYjYwYWNmZDFiM2ZkIiwiY29tcGFueUlkIjoiNWUxOWQ0ZWRhMjNiYjYwYWNmZDFiM2ZjIn0sImlhdCI6MTU3ODc1MTUxOCwiZXhwIjoxNTgyMzUxNTE4fQ.6C3c9ll7sYDRL5vIJPOrJnd93I12lkYkbitbr4APtBY',
      }
    }
    
    const res = await axios('/api/companies/me', config);
 
    dispatch({
      type: GET_COMPANY,
      payload: res.data
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
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWUxOWQ1MWNhMjNiYjYwYWNmZDFiM2ZkIiwiY29tcGFueUlkIjoiNWUxOWQ0ZWRhMjNiYjYwYWNmZDFiM2ZjIn0sImlhdCI6MTU3ODc1MTUxOCwiZXhwIjoxNTgyMzUxNTE4fQ.6C3c9ll7sYDRL5vIJPOrJnd93I12lkYkbitbr4APtBY',
      }
    }
    const res = await axios('api/companies/me', config);
    const recentProductsIds = res.data.recentProducts;
     
    dispatch({
      type: GET_RECENT_PRODUCTS,
      payload: recentProductsIds
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
export const getFavoriteProducts = (favoriteIds) => async dispatch => {
  try {
    let config = {
      headers: {
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWUxOWQ1MWNhMjNiYjYwYWNmZDFiM2ZkIiwiY29tcGFueUlkIjoiNWUxOWQ0ZWRhMjNiYjYwYWNmZDFiM2ZjIn0sImlhdCI6MTU3ODc1MTUxOCwiZXhwIjoxNTgyMzUxNTE4fQ.6C3c9ll7sYDRL5vIJPOrJnd93I12lkYkbitbr4APtBY',
        'Content-Type': 'application/json'
      }
    }
    
    const body = {
      favoriteIds
    }
/* 
    const res = await axios(
      'api/companies/favorite-products',
      body,
      config
    );
    const favoriteProducts = res.data; */

    dispatch({
      type: GET_FAV_PRODUCTS,
      payload: favoriteIds
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