import { combineReducers } from 'redux';
//import reducers here
import alert from './alert';
import auth from './auth';

export default combineReducers({
  //export reducers here
  alert,
  auth
});