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
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWUxNzg4OGEwMzk4NTgyZTlhOGVlOTAxIiwiY29tcGFueUlkIjoiNWUxNzNiY2MyODBmMzYwNWZiMTg2YTMzIn0sImlhdCI6MTU3ODY1NjA0NiwiZXhwIjoxNTgyMjU2MDQ2fQ.CMiliMpt1j0UEmm9Zu-7qi3yPQizp-MYs_g7N7JcSN4',
      }
    }
    
    const res = await axios('/api/orders/5e1748315e47de32c0c16c89', config);
 
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
