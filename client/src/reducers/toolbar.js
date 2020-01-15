import {
  TOGLE_TOOLBAR
} from '../actions/constants';


const initialState = {
  toolbar: true
}

export default function(state = initialState, action) {
  const {
    type
  } = action;

  switch (type) {
    case TOGLE_TOOLBAR:
      return {
        ...state,
        toolbar: !state.toolbar
      }
      default:
        return state;
  }
}