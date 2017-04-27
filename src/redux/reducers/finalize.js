import { SET_FINALIZE } from '../constants/index';

import makeReducer from './fabric';

const initialState = {
  data: '',
  timestamp: '',
  latitude: null,
  longitude: null,
  name: '',
  team: '',
  email: '',
  modal: false,
  comment: '',
  imgName: '',
  imgUri: ''
};

export default makeReducer(initialState, SET_FINALIZE);
