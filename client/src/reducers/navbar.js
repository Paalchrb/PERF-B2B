import {
  CHANGE_SEARCH_FIELD
} from '../actions/constants';


const initialState = {
  searchField: ''
}

export default function(state = initialState, action = {}) {
  switch(action.type) {
    case CHANGE_SEARCH_FIELD:
      return Object.assign({}, { state, searchField: action.payload });
    default:
        return state;
  }
}