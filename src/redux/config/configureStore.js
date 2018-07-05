import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import errorMiddleware from '../../common/error/errorMiddleware';
import rootReducer from './rootReducer';

const configureStore = (initialState = {}) => {
  const enhancers = [];
  const middleware = [thunkMiddleware, errorMiddleware];

  if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  );

  const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers
  );

  return store;
}

export default configureStore;
