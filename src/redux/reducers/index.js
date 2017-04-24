import { combineReducers } from 'redux';
import app from './app';
import navigation from './navigation';
import finalize from './finalize';
import log from './log';
import moth from './moth';
import readLocations from './readLocations';

const rootReducer = combineReducers({
  app,
  navigation,
  finalize,
  log,
  moth,
  readLocations
});

export default rootReducer;
