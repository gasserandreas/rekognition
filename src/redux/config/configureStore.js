import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reduxReset from 'redux-reset'

import errorMiddleware from '../../common/error/errorMiddleware';
import api from '../../common/services/api';

import rootReducer from './rootReducer';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: 'fullsize-app',
  storage,
  whitelist: ['app'],
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = (initialState = {}) => {
  const {
    NODE_ENV,
  } = process.env;

  const enhancers = [
    reduxReset(),
  ];
  let middleware = [
    thunkMiddleware.withExtraArgument({
      api: api((func) => store.dispatch(func)),
    }),
    errorMiddleware,
  ];

  if (NODE_ENV === 'development') {
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
    persistedReducer,
    initialState,
    composedEnhancers
  );

  const persistor = persistStore(store);

  return {
    store,
    persistor,
  };
}

export default configureStore;
