import {
  TOGLE_TOOLBAR
} from '../actions/constants';

export const togleToolbar = event => dispatch => {
  dispatch({
    type: TOGLE_TOOLBAR
  });
};

