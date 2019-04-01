import thunkMiddleware from 'redux-thunk';
import { compose } from 'redux';

import { createMiddleware as createErrorMiddleware } from '../../util/ErrorHandler';

import configureStore, { __testables__ } from '../configureStore'; // 

const {
  getComposeEnhancers,
  getEnhancers,
  getMiddleware,
} = __testables__; // 

it('should create redux store', () => {
  const { store } = configureStore();

  // check store
  expect(store).toBeTruthy();

  // check basic store methods
  const { dispatch, getState, subscribe } = store;
  expect(dispatch).toBeInstanceOf(Function);
  expect(getState).toBeInstanceOf(Function);
  expect(subscribe).toBeInstanceOf(Function);
});

describe('redux getComposeEnhancers test suite', () => {
  // setup
  let oldEnv;
  beforeEach(() => {
    // persist old env
    oldEnv = { ...process.env };
  });

  afterEach(() => {
    // restore old env vars
    Object.keys(oldEnv).forEach((key) => {
      process.env[key] = oldEnv[key];
    });
  });

  it('should return default composeEnhancers', () => {
    const composedEnhancers = getComposeEnhancers();
    // should be instance of default compose method
    expect(composedEnhancers.prototype).toEqual(compose().prototype);
  });

  it('should return default compose if dev tool extension is not available', () => {
    // set extension
    const devTools = null;
    const oldReduxDevtools = global['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']; // eslint-disable-line dot-notation
    global['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] = devTools; // eslint-disable-line dot-notation

    // set to dev
    process.env.NODE_ENV = 'development';

    const composedEnhancers = getComposeEnhancers();
    expect(composedEnhancers).toEqual(compose);

    // restore old dev tools
    global['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] = oldReduxDevtools; // eslint-disable-line dot-notation
  });

  it('should use dev tool extension if available', () => {
    // set extension
    const devTools = () => ({});
    const oldReduxDevtools = global['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']; // eslint-disable-line dot-notation
    global['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] = devTools; // eslint-disable-line dot-notation

    // set to dev
    process.env.NODE_ENV = 'development';

    const composedEnhancers = getComposeEnhancers();
    expect(composedEnhancers).toEqual(devTools);

    // restore old dev tools
    global['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] = oldReduxDevtools; // eslint-disable-line dot-notation
  });
});

describe('redux getEnhancers test suite', () => {
  it('should return default enhancers', () => {
    expect(getEnhancers()).toEqual([]);
  });
});
