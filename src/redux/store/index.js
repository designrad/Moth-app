import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import devTools from 'remote-redux-devtools';

import reducers from '../reducers';

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [sagaMiddleware];

  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middleware),devTools({ name: 'Designrad', hostname: 'localhost', port: 8889, realtime: true }))
  );
  sagaMiddleware.run(rootSaga);

  return store;
}
