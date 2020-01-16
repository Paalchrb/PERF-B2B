import {
  TOGGLE_TOOLBAR
} from '../actions/constants';

export const toggleToolbar = event => dispatch => {
  dispatch({
    type: TOGGLE_TOOLBAR
  });
};

