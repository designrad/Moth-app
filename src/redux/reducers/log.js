import {
  PUT_PHOTO_STATUS
} from '../constants/index';
import makeReducer from './fabric';

const initialState = {
  photos: []
};

export default makeReducer(initialState, PUT_PHOTO_STATUS);
