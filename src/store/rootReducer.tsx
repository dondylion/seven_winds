import {combineReducers} from 'redux';

const CHANGE_ROWS = 'CHANGE_ROWS';

export function changeRows(data) {
  return {
    type: CHANGE_ROWS,
    payload: data,
  };
}

const initialRows = {
  rows: null,
};

function rowsReducer(state = initialRows, action) {
  switch (action.type) {
    case CHANGE_ROWS:
      return {...state, rows: action.payload};
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  rowsReducer: rowsReducer,
});

export default rootReducer;
