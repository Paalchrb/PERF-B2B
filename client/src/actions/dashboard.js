import axios from 'axios';

import {
  GET_COMPANY,
  COMPANY_ERROR,
  GET_PRODUCTS,
  PRODUCT_ERROR
} from './constants';

//get user company
export const getMyCompany = () => async dispatch => {
  try {
    let config = {
      headers: {
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWUxNzg4OGEwMzk4NTgyZTlhOGVlOTAxIiwiY29tcGFueUlkIjoiNWUxNzNiY2MyODBmMzYwNWZiMTg2YTMzIn0sImlhdCI6MTU3ODY1NjA0NiwiZXhwIjoxNTgyMjU2MDQ2fQ.CMiliMpt1j0UEmm9Zu-7qi3yPQizp-MYs_g7N7JcSN4',
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
    const res = {} //need api to my recent products
    dispatch({
      type: GET_PRODUCTS,
      payload: res
    })
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