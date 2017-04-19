import { combineReducers } from 'redux';
import app from './app';
import navigation from './navigation';
import finalize from './finalize';

const rootReducer = combineReducers({
  app,
  navigation,
  finalize
});

export default rootReducer;
