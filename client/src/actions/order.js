import axios from 'axios';

import {
  GET_ALL_ORDERS,
  GET_SINGLE_ORDER,
  ORDER_ERROR
} from '../actions/constants';


//Get all user orders
export const getAllOrders = (token) => async dispatch => {
  try {
    let config = {
      headers: {
        'x-auth-token': token
      }
    }
    
    const res = await axios('/api/orders/me', config); 
 
    dispatch({
      type: GET_ALL_ORDERS,
      payload: res.data
    });
  } catch (error) {
    console.log('There an an error retrieving your order');
    // dispatch({
    //   type: ORDER_ERROR,
    //   payload: { 
    //     msg: error.response.statusText, 
    //     status: error.response.status 
    //   }
    // });
  }
};

//Get user order by id
export const getOrderById = (token, orderId) => async dispatch => {
  try {
    let config = {
      headers: {
        'x-auth-token': token
      }
    }
    
    const res = await axios(`/api/orders/${orderId}`, config); 

    dispatch({
      type: GET_SINGLE_ORDER,
      payload: res.data
    });
  } catch (error) {
    console.log('There an an error retrieving your order');
    // dispatch({
    //   type: ORDER_ERROR,
    //   payload: { 
    //     msg: error.response.statusText, 
    //     status: error.response.status 
    //   }
    // });
  }
};

//Toggles Single Order-view in Orders-view
// export const setCurrentOrder = (orderId) => dispatch => {
//   dispatch({
//     type: SET_CURRENT_ORDER,
//     payload: orderId
//   });
// }
