import { SET_FINALIZE, SET_USER_OPTIONS } from '../constants/index';

import makeReducer from './fabric';

const initialState = {
  date: '',
  latitude: null,
  longitude: null,
  options: null,
  modal: false,
  comment: '',
  imgName: '',
  imgUri: ''
};

export default makeReducer(initialState, SET_FINALIZE, (oldState, action) => {
  const state = { ...oldState };
  switch (action.type) {
    case SET_USER_OPTIONS:
      state.options = action.payload;
      break;
    default:
      return state;
  }
  return state;
});
