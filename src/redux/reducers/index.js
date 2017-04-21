import { combineReducers } from 'redux';
import app from './app';
import navigation from './navigation';
import finalize from './finalize';
import log from './log';
import moth from './moth';

const rootReducer = combineReducers({
  app,
  navigation,
  finalize,
  log,
  moth
});

export default rootReducer;
