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
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWUxNzNlYzdiODJhMTgyMmYxNzA4MWQ2IiwiY29tcGFueUlkIjoiNWUxNzNiZmYyODBmMzYwNWZiMTg2YTM0In0sImlhdCI6MTU3ODY4Nzg5OSwiZXhwIjoxNTgyMjg3ODk5fQ.IMC7GoDJ001lUbD3wfveMDQL4A0YYeBYve7-HLa4agI',
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
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWUxNzNlYzdiODJhMTgyMmYxNzA4MWQ2IiwiY29tcGFueUlkIjoiNWUxNzNiZmYyODBmMzYwNWZiMTg2YTM0In0sImlhdCI6MTU3ODY4Nzg5OSwiZXhwIjoxNTgyMjg3ODk5fQ.IMC7GoDJ001lUbD3wfveMDQL4A0YYeBYve7-HLa4agI',
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
export const getFavoriteProducts = () => async dispatch => {
  try {
    let config = {
      headers: {
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWUxNzNlYzdiODJhMTgyMmYxNzA4MWQ2IiwiY29tcGFueUlkIjoiNWUxNzNiZmYyODBmMzYwNWZiMTg2YTM0In0sImlhdCI6MTU3ODY4Nzg5OSwiZXhwIjoxNTgyMjg3ODk5fQ.IMC7GoDJ001lUbD3wfveMDQL4A0YYeBYve7-HLa4agI',
      }
    }
    const res = await axios('api/companies/me', config);
    const favoriteProductsIds = res.data.favoriteProducts;

    dispatch({
      type: GET_FAV_PRODUCTS,
      payload: favoriteProductsIds
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