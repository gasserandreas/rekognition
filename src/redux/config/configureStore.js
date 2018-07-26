import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import errorMiddleware from '../../common/error/errorMiddleware';
import rootReducer from './rootReducer';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth'] // only auth will be persisted
};
const persistedReducer = persistReducer(persistConfig, rootReducer)

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
    persistedReducer,
    initialState,
    composedEnhancers
  );

  const persistor = persistStore(store);

  return { store, persistor };
}

export default configureStore;
