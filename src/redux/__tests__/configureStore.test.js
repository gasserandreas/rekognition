/* global testUtils */
import { compose } from 'redux';

import configureStore, { __testables__ } from '../configureStore';

import {
  applicationMessageAdd,
  applicationMessageShow,
} from '../application/message';
  
const {
  getComposeEnhancers,
  getEnhancers,
  getErrorOptions,
} = __testables__;

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

describe('redux getErrorOptions test sutie', () => {
  const mockstore = testUtils.createMockStore();

  it('should return object with error middleware options', () => {
    const options = getErrorOptions();
    expect(options).toBeTruthy();
    
    // check for attributes
    const { logToUI } = options;
    expect(logToUI).toBeInstanceOf(Function);
  });

  it('logToUI should fire "addMessage" redux action', () => {
    const error = {
      title: 'Error',
      detail: 'Error detail',
    };

    const store = mockstore();
    const { dispatch } = store;

    const options = getErrorOptions();
    const { logToUI } = options;

    const expectedActions = [
      applicationMessageAdd({
        title: error.title,
        text: JSON.stringify(error.detail),
        showRefresh: true,
      }),
      applicationMessageShow(),
    ];

    // fire action
    logToUI(error, dispatch);

    expect(store.getActions()).toEqual(expectedActions);
  });
});
