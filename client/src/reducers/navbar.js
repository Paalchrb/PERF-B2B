import {
  CHANGE_SEARCH_FIELD,
  SUBMIT_SEARCH
} from '../actions/constants';


const initialState = {
  searchField: ''
}

export default function(state = initialState, action = {}) {
  switch(action.type) {
    case CHANGE_SEARCH_FIELD:
    case SUBMIT_SEARCH:
      return {
        ...state,  
        searchField: action.payload 
      };
    default:
        return state;
  }
}