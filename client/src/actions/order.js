import axios from 'axios';

import {
  GET_ORDER,
  ORDER_ERROR
} from '../actions/constants';


//get user order
export const getMyOrder = () => async dispatch => {
  try {
    let config = {
      headers: {
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWUxOWQ5NDZmOTExYTUxYjE1NDVlZTRlIiwiY29tcGFueUlkIjoiNWUxOWQ2ZjJmOTExYTUxYjE1NDVlZTRjIn0sImlhdCI6MTU3ODc3NTAyNywiZXhwIjoxNTgyMzc1MDI3fQ.p7f-59xoGg5zMhmHg61lrnLwDpcyQ_DNrTtaizHYBXM',
      }
    }
    
    const res = await axios('/api/orders/5e1a2392c9ef3b0b2f4d2310', config);
 
    dispatch({
      type: GET_ORDER,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: ORDER_ERROR,
      payload: { 
        msg: error.response.statusText, 
        status: error.response.status 
      }
    });
  }
};
