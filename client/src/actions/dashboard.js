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
    const res = await axios('api/orders/me', config);
    const products = res.data.procurementOrders
      .map(order => order.orderLine
        .map(line => line.productId)
      )
      .flat();
    console.log(products);
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