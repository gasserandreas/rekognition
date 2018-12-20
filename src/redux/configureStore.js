import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { debounce } from 'lodash';
import ric from 'ric-shim';

import { createMiddleware, addUnhandledPromiseCatcher } from '../util/ErrorHandler';
import rootReducer from './rootReducer';

import configureReactors from './reactors/configureReactors';
import { APP_IDLE } from './application';
import { logOutUser } from './auth';

import GraphApi from '../util/GraphApi';
import { getUrl } from '../util/services/networkUtils';

const configureStore = (initialState = {}) => {
  const {
    NODE_ENV,
  } = process.env;

  const errorMiddleware = createMiddleware();

  const graphApiOptions = {
    url: getUrl('graphql'),

  }

  const enhancers = [];
  const middleware = [
    thunkMiddleware.withExtraArgument({
      GraphApi: new GraphApi({
        endpoint: getUrl('graphql'),
        onAuthError: (message) => store.dispatch(logOutUser(message)), //AUTH_LOG_OUT
      }),
    }),
    errorMiddleware,
  ];

  let composeEnhancers = compose;
  if (NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__; // eslint-disable-line no-underscore-dangle, max-len

    if (typeof devToolsExtension === 'function') {
      composeEnhancers = devToolsExtension;
    }
  }

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );

  // add reactors
  store.subscribe(configureReactors(store));

  // idle configuration
  const idleDispatcher = () => {
    store.dispatch({ type: APP_IDLE });
  };

  // debounce app idle all 30 seconds
  const deBounced = debounce(() => {
    // The requestAnimationFrame ensures it doesn't run when tab isn't active
    // the requestIdleCallback makes sure the browser isn't busy with something
    // else.
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

  return store;
};

export default configureStore;
