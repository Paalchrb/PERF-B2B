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
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWUxNzNlYzdiODJhMTgyMmYxNzA4MWQ2IiwiY29tcGFueUlkIjoiNWUxNzNiZmYyODBmMzYwNWZiMTg2YTM0In0sImlhdCI6MTU3ODY1ODc1OCwiZXhwIjoxNTgyMjU4NzU4fQ.8Yw0sgEumvy5GvB5-U8Pe_5-Tdk2HWM1pafN09M-HKk',
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
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWUxNzNlYzdiODJhMTgyMmYxNzA4MWQ2IiwiY29tcGFueUlkIjoiNWUxNzNiZmYyODBmMzYwNWZiMTg2YTM0In0sImlhdCI6MTU3ODY1ODc1OCwiZXhwIjoxNTgyMjU4NzU4fQ.8Yw0sgEumvy5GvB5-U8Pe_5-Tdk2HWM1pafN09M-HKk',
      }
    }
    const res = await axios('api/companies/me', config);
    const recProductsIds = res.data.recentProducts;
     
    dispatch({
      type: GET_RECENT_PRODUCTS,
      payload: res
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