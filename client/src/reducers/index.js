import { combineReducers } from 'redux';
//import reducers here
import alert from './alert';
import auth from './auth';
import dashboard from './dashboard';
import order from './order';
import navbar from './navbar';
import shopCart from './shopCart';

export default combineReducers({
  //export reducers here
  alert,
  auth,
  dashboard,
  order,
  navbar,
  shopCart
});