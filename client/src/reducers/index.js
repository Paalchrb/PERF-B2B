import { combineReducers } from 'redux';
//import reducers here
import alert from './alert';
import dashboard from './dashboard';
import order from './order';
import navbar from './navbar';

export default combineReducers({
  //export reducers here
  alert,
  dashboard,
  order,
  navbar
});