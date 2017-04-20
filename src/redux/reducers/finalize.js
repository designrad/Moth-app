import { SET_FINALIZE } from '../constants/index';

import makeReducer from './fabric';

const initialState = {
  data: '',
  timestamp: '',
  latitude: '',
  longitude: '',
  name: '',
  team: '',
  email: '',
  modal: false,
  comment: ''
};

export default makeReducer(initialState, SET_FINALIZE);
