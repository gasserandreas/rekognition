/* global testUtils */
import { compose } from 'redux';

import configureStore, { __testables__ } from '../configureStore';
import rootReducers from '../rootReducer';

import { appIdle, appReset, __testables__ as applicationTestables } from '../application';
import { __testables__ as authTestables } from '../auth';

import { applicationMessageAdd, applicationMessageShow } from '../application/message';

const { applicationDidLoad } = applicationTestables;
const { authSetToken } = authTestables;

const {
  getComposeEnhancers,
  getEnhancers,
  getErrorOptions,
  createReducer,
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

describe('redux createReducer test suite', () => {
  let mockedDateNow;

  beforeAll(() => {
    const now = Date.now();
    mockedDateNow = jest.spyOn(Date, 'now').mockImplementation(() => now);
  });

  afterAll(() => {
    mockedDateNow.restoreMock();
  });

  it('should create new reducer with static and provided reducers', () => {
    const dynamicReducers = {
      demo: () => null,
    };
    const rootReducer = createReducer(dynamicReducers);

    const state = rootReducer(undefined, { type: '' });

    expect(state).toBeTruthy();

    const expectedKeys = Object.keys({
      ...rootReducers,
      ...dynamicReducers,
    });
    expect(Object.keys(state)).toEqual(expectedKeys);
  });

  it('should create new reducer with static and default empty dynamic reducers', () => {
    const rootReducer = createReducer();

    const state = rootReducer(undefined, { type: '' });

    expect(state).toBeTruthy();

    expect(Object.keys(state)).toEqual(Object.keys(rootReducers));
  });

  it('should reset reducer data on APP_RESET', () => {
    const rootReducer = createReducer();

    // fire some actions to reducer
    const rootState1 = rootReducer(undefined, appIdle());
    const rootState2 = rootReducer(rootState1, applicationDidLoad());
    const rootState3 = rootReducer(rootState2, authSetToken('invalid token'));

    // check for non empty redux state
    expect(rootState3).not.toEqual(rootReducer(undefined, appIdle));

    // fire reset and check again
    expect(rootReducer(rootState3, appReset())).toEqual(rootState1);
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
