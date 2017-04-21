import { combineReducers } from 'redux';
import app from './app';
import navigation from './navigation';
import finalize from './finalize';
import log from './log';

const rootReducer = combineReducers({
  app,
  navigation,
  finalize,
  log
});

export default rootReducer;
