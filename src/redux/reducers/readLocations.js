import { PUT_LOCATIONS } from '../constants/index';
import makeReducer from './fabric';

const initialState = {
  locations: []
};

export default makeReducer(initialState, PUT_LOCATIONS);
