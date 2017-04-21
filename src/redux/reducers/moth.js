import { PUT_MY_PHOTO } from '../constants/index';
import makeReducer from './fabric';

const initialState = {
  image: {}
};

export default makeReducer(initialState, PUT_MY_PHOTO);
