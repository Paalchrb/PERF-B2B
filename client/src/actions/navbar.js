import {
  CHANGE_SEARCH_FIELD,
  SUBMIT_SEARCH
} from '../actions/constants';
import axios from 'axios';


export const setSearchField = text => dispatch => {
  dispatch({
    type: CHANGE_SEARCH_FIELD,
    payload: text
  });
};

export const submitSearch = text => async dispatch => {


  dispatch({
    type: SUBMIT_SEARCH,
    // payload
  });

  
};
