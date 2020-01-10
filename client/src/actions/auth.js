import axios from 'axios';
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './constants';
import setAuthToken from '../utils/setAuthToken';

//Load user
export const loadUser = () => async dispatch => {
  if(localStorage.token) {
    setAuthToken(localStorage.token)
  };

  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data //Includes user AND company, and will this create a problem? (res.data.user?)
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

//Login User
export const login = (email, password) => async dispatch => {
  const config =  {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data //(res.data.user?)
    });
    console.log(res);

    dispatch(loadUser());
  } catch (error) {
    // const errors = error.response.data.errors;
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

//Logout
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};