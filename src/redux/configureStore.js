/* global requestAnimationFrame */
import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import debounce from 'lodash/debounce';
import ric from 'ric-shim';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { createMiddleware, addUnhandledPromiseCatcher } from '../util/ErrorHandler';
import rootReducers from './rootReducer';

import configureReactors from './reactors/configureReactors';
import reactors from './reactors/reactors';

import { APP_IDLE, APP_RESET, loadApplication } from './application';
import { logOutUser } from './auth';

import GraphApi from '../util/GraphApi';
import { getUrl } from '../util/services/networkUtils';

import { addMessage } from './application/message';

const createReducer = (asyncReducers = {}) => {
  const reducers = combineReducers({
    ...rootReducers,
    ...asyncReducers,
  });

  const newRootReducer = (state, action) => {
    let usedState = state;

    // handle reset
    if (action.type === APP_RESET) {
      usedState = undefined;
    }

    return reducers(usedState, action);
  };

  return newRootReducer;
};

const getPersistedReducer = () => {
  // configure persist store
  const persistConfig = {
    key: 'rekognition',
    storage,
    whitelist: [
      'auth',
    ],
    stateReconciler: autoMergeLevel2,
  };

  const reducer = createReducer();

  return persistReducer(persistConfig, reducer);
};

const getComposeEnhancers = () => {
  // enable dev tools in development mode only
  if (process.env.NODE_ENV !== 'development') {
    return compose;
  }

  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__; // eslint-disable-line no-underscore-dangle, max-len
  // fallback to use default compose
  if (typeof devToolsExtension !== 'function') {
    return compose;
  }

  return devToolsExtension;
};

const getEnhancers = () => [];

const getErrorOptions = () => ({
  logToUI: (error, dispatch) => {
    const message = {
      title: error.title,
      text: error.detail ? JSON.stringify(error.detail) : null,
      showRefresh: true,
    };
    addMessage(message)(dispatch);
  },
});

const configureStore = (initialState = {}) => {
  const errorOptions = getErrorOptions();
  const errorMiddleware = createMiddleware(errorOptions);

  const middleware = [
    thunkMiddleware.withExtraArgument({
      // init graphql api
      GraphApi: new GraphApi({
        endpoint: getUrl('graphql'),
        /**
         * Attention: MONKEY PATCH store into GraphApi
         * Not the best design but works for now, redo later on
         * or in next project find different solution for that...
         */
        /* istanbul ignore next */
        onAuthError: (message) => {
          /* istanbul ignore next */
          store.dispatch(logOutUser(message)); // eslint-disable-line no-use-before-define
          // AUTH_LOG_OUT
        },
      }),
    }),
    errorMiddleware,
  ];

  const enhancers = getEnhancers();
  const composeEnhancers = getComposeEnhancers();
  const persistedReducer = getPersistedReducer();

  const store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware), ...enhancers),
  );

  const persistor = persistStore(store, null, () => store.dispatch(loadApplication()));

  // add reactors
  store.subscribe(configureReactors(store, reactors));

  // idle configuration
  /* istanbul ignore next */
  const idleDispatcher = () => {
    /* istanbul ignore next */
    store.dispatch({ type: APP_IDLE });
  };

  // debounce app idle all 30 seconds
  /* istanbul ignore next */
  const deBounced = debounce(() => {
    // The requestAnimationFrame ensures it doesn't run when tab isn't active
    // the requestIdleCallback makes sure the browser isn't busy with something
    // else.
    /* istanbul ignore next */
    requestAnimationFrame(() => ric(idleDispatcher, { timeout: 500 }));
  }, 30000);

  // Now this will run *each time* something
  // is dispatched. But once it's been 30 seconds
  // since something has happened. It will cause
  // its *own* dispatch. Which then start the cycle
  // over again.
  store.subscribe(deBounced);

  // add error handler
  addUnhandledPromiseCatcher(store);

  return {
    store,
    persistor,
  };
};

export const __testables__ = {
  // eslint-disable-line no-underscore-dangle
  getEnhancers,
  getComposeEnhancers,
  getPersistedReducer,
  getErrorOptions,
  createReducer,
};

export default configureStore;
