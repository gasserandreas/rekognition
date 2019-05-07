/* global Event, testUtils */
import thunkMiddleware from 'redux-thunk';

import {
  ErrorTypes,
  LogLevel,
  reportInternalReduxError,
  reportReactError,
  reportCustomError,
  createNetworkError,
  createInvalidDataError,
  createUnknownError,
  addUnhandledPromiseCatcher,
  createMiddleware,
} from '../ErrorHandler';

describe('ErrorHandler redux error types test suite', () => {
  it('should return internal redux error', () => {
    const error = new Error('new error');
    const expectedObject = {
      type: 'INTERNAL_REDUX_ERROR',
      payload: error,
      error: true,
    };
    expect(reportInternalReduxError(error)).toEqual(expectedObject);
  });

  it('should return react redux error', () => {
    const error = new Error('new error');
    const expectedObject = {
      type: 'REACT_ERROR',
      payload: error,
      error: true,
    };
    expect(reportReactError(error)).toEqual(expectedObject);
  });

  it('should return custom redux error', () => {
    const error = new Error('new error');
    const expectedObject = {
      type: 'CUSTOM_ERROR',
      payload: error,
      error: true,
    };
    expect(reportCustomError(error)).toEqual(expectedObject);
  });
});

describe('ErrorHandler error creator test suite', () => {
  it('should create network error', () => {
    const error = new Error('Network error');
    const response = 'response';
    const expectedError = Object.assign(new Error('Network error'), {
      type: ErrorTypes.NetworkError,
      title: 'Network error',
      payload: response,
      detail: error,
      logLevel: LogLevel.Error,
    });
    expect(createNetworkError(error, response)).toEqual(expectedError);
  });

  it('should create unknown network error', () => {
    const response = 'response';
    const expectedError = Object.assign(new Error('Unknown network error'), {
      type: ErrorTypes.NetworkError,
      title: 'Network error',
      payload: response,
      detail: null,
      logLevel: LogLevel.Error,
    });
    expect(createNetworkError(null, response)).toEqual(expectedError);
  });

  it('should create data error', () => {
    const error = new Error('Data error');
    const data = {};
    const expectedError = Object.assign(new Error('Data error'), {
      type: ErrorTypes.InvalidDataError,
      title: 'Invalid data',
      payload: data,
      detail: error,
      logLevel: LogLevel.Error,
    });
    expect(createInvalidDataError(error, data)).toEqual(expectedError);
  });

  it('should create unknown data error', () => {
    const data = {};
    const expectedError = Object.assign(new Error('Unknown data error'), {
      type: ErrorTypes.InvalidDataError,
      title: 'Invalid data',
      payload: data,
      detail: null,
      logLevel: LogLevel.Error,
    });
    expect(createInvalidDataError(null, data)).toEqual(expectedError);
  });

  it('should create unhandled / unknown error', () => {
    const error = new Error('Unhandled / unknown error');
    const data = {};
    const expectedError = Object.assign(new Error('Unhandled / unknown error'), {
      type: ErrorTypes.UnknownError,
      title: 'Caught unhandled exception',
      payload: data,
      detail: error,
      logLevel: LogLevel.Error,
    });
    expect(createInvalidDataError(error, data)).toEqual(expectedError);
  });

  it('should create unhandled / unknown error without error object and without data object', () => {
    const data = undefined;
    const expectedError = Object.assign(new Error('Unhandled exception detected'), {
      type: ErrorTypes.UnknownError,
      title: 'Caught unhandled exception',
      payload: data,
      detail: null,
      logLevel: LogLevel.Error,
    });
    expect(createUnknownError(null, data)).toEqual(expectedError);
  });
});

describe('ErrorHandler addUnhandledPromiseCatcher test suite', () => {
  const mockstore = testUtils.createMockStore();

  let spyConsole;
  let spyAddEventListener;
  let spySimpleEventPreventDefault;
  let spyComplexEventPreventDefault;

  afterEach(() => {
    spyConsole && spyConsole.mockClear();
    spyAddEventListener && spyAddEventListener.mockClear();
    spySimpleEventPreventDefault && spySimpleEventPreventDefault.mockClear();
    spyComplexEventPreventDefault && spyComplexEventPreventDefault.mockClear();
  });

  it('should add event handler to window object', () => {
    spyAddEventListener = jest.spyOn(window, 'addEventListener');
    spyConsole = jest.spyOn(console, 'error').mockImplementationOnce(() => {});

    const store = mockstore();
    addUnhandledPromiseCatcher(store);

    expect(window.addEventListener).toHaveBeenCalled();
    expect(spyAddEventListener.mock.calls[0][0]).toContain('unhandledrejection');
  });

  it('should not fire on other window events', () => {
    spyConsole = jest.spyOn(console, 'error').mockImplementationOnce(() => {});

    const store = mockstore();
    addUnhandledPromiseCatcher(store);

    const event = new Event('resize');
    window.dispatchEvent(event);

    const expectedActions = [];
    expect(store.getActions()).toEqual(expectedActions);
  });

  // not possible to fire Promise.reject to jsdom due bug: https://github.com/facebook/jest/issues/5620
  it('should catch unhandledreject error fired by uncaught promise issues', () => {
    // spy & mock console.error
    spyConsole = jest.spyOn(console, 'error').mockImplementation(() => {});

    const store = mockstore();

    addUnhandledPromiseCatcher(store);

    // create and configure `unhandledrejection` event
    const simpleEvent = new Event('unhandledrejection');
    const complexEvent = new Event('unhandledrejection');
    complexEvent.reason = 'test reason';

    spySimpleEventPreventDefault = jest.spyOn(simpleEvent, 'preventDefault');
    spyComplexEventPreventDefault = jest.spyOn(complexEvent, 'preventDefault');

    // action creator
    const createErrorAction = event => ({
      ...new Error(event.reason ? event.reason : 'Internal application error: Uncaught promise in code detected'),
      title: 'Uncaught promise in code detected',
      payload: undefined,
      detail: event,
      logLevel: LogLevel.Error,
    });

    // fire event without data
    window.dispatchEvent(simpleEvent);
    window.dispatchEvent(complexEvent);

    const expectedActions = [
      reportInternalReduxError(createErrorAction(simpleEvent)),
      reportInternalReduxError(createErrorAction(complexEvent)),
    ];

    // check expected redux actions
    expect(store.getActions()).toEqual(expectedActions);

    // check for expected console.error statement
    expect(console.error).toHaveBeenCalled(); // eslint-disable-line no-console

    // check event preventDefault is not called
    expect(simpleEvent.preventDefault).toHaveBeenCalled();
    expect(complexEvent.preventDefault).toHaveBeenCalled();
  });
});

describe('ErrorHandler middleware test suite', () => {
  // helpers
  const createTestError = (logLevel, error, data = null) => Object.assign(new Error(error ? error.message : 'Unhandled Test Error detected'), {
    type: ErrorTypes.UnknownError,
    title: 'Caught Test Error',
    payload: data,
    detail: error,
    logLevel,
  });

  // test configuration
  let spyConsoleLog;
  let spyConsoleInfo;
  let spyConsoleError;
  let spyConsoleGroupCollapsed;
  let spyConsoleGroupEnd;

  let oldNodeENV;

  beforeEach(() => {
    spyConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
    spyConsoleInfo = jest.spyOn(console, 'info').mockImplementation(() => {});
    spyConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    spyConsoleGroupCollapsed = jest.spyOn(console, 'groupCollapsed').mockImplementation(() => {});
    spyConsoleGroupEnd = jest.spyOn(console, 'groupEnd').mockImplementation(() => {});

    oldNodeENV = process.env.NODE_ENV;
  });

  afterEach(() => {
    spyConsoleLog.mockClear();
    spyConsoleInfo.mockClear();
    spyConsoleError.mockClear();
    spyConsoleGroupCollapsed.mockClear();
    spyConsoleGroupEnd.mockClear();

    // clean up
    process.env.NODE_ENV = oldNodeENV;
  });

  // define helper actions
  const IDLE = 'IDLE';
  const ERROR = 'ERROR';

  const idleAction = () => ({ type: IDLE });
  const errorAction = payload => ({
    type: ERROR,
    payload,
    error: true,
  });

  it('should create middleware with defaults option', () => {
    const mockstore = testUtils.createMockStore([thunkMiddleware, createMiddleware()]);
    const store = mockstore();

    const action = idleAction();
    const expectedActions = [action];
    store.dispatch(action);

    // expect no extra action on default action dispatch
    expect(store.getActions()).toEqual(expectedActions);

    expect(spyConsoleLog).not.toBeCalled();
    expect(spyConsoleInfo).not.toBeCalled();
    expect(spyConsoleError).not.toBeCalled();
    expect(spyConsoleGroupCollapsed).not.toBeCalled();
    expect(spyConsoleGroupEnd).not.toBeCalled();
  });

  it('should catch error action follow default behaviour (not production)', () => {
    // configure env to not be in production
    process.env.NODE_ENV = 'development';

    const options = {
      logToUI: jest.fn(),
      logToServer: jest.fn(),
      logToConsole: jest.fn(),
    };

    const errorMiddleware = createMiddleware(options);
    const mockstore = testUtils.createMockStore([thunkMiddleware, errorMiddleware]);
    const store = mockstore();

    // create errors
    const firstError = createTestError(LogLevel.Log, {}, {});
    const firstAction = errorAction(firstError);

    const secondError = createTestError(LogLevel.Error, {}, {});
    const secondAction = errorAction(secondError);

    /**
     * check default behaviour for:
     *  - middleware in not prod environment
     *  - LogLevel is equal `Log`
     * */
    store.dispatch(firstAction);

    // should not fire additional action
    expect(store.getActions()).toEqual([firstAction]);

    // check call counts
    expect(options.logToUI).toBeCalledTimes(1);
    expect(options.logToServer).toBeCalledTimes(0);
    expect(options.logToConsole).toBeCalledTimes(1);

    /**
     * check default behaviour for:
     *  - middleware in not prod environment
     *  - LogLevel is equal `Log`
     * */
    store.dispatch(secondAction);

    expect(store.getActions()).toEqual([firstAction, secondAction]);

    expect(options.logToUI).toBeCalledTimes(2);
    expect(options.logToServer).toBeCalledTimes(0);
    expect(options.logToConsole).toBeCalledTimes(2);
  });

  it('should catch error action follow default behaviour (in production)', () => {
    // configure env to not be in production
    process.env.NODE_ENV = 'production';

    const options = {
      logToUI: jest.fn(),
      logToServer: jest.fn(),
      logToConsole: jest.fn(),
    };

    const errorMiddleware = createMiddleware(options);
    const mockstore = testUtils.createMockStore([thunkMiddleware, errorMiddleware]);
    const store = mockstore();

    // create errors
    const firstError = createTestError(LogLevel.Log, {}, {});
    const firstAction = errorAction(firstError);

    const secondError = createTestError(LogLevel.Error, {}, {});
    const secondAction = errorAction(secondError);

    /**
     * check default behaviour for:
     *  - middleware in prod environment
     *  - LogLevel is equal `Log`
     * */
    store.dispatch(firstAction);

    // should not fire additional action
    expect(store.getActions()).toEqual([firstAction]);

    // check call counts
    expect(options.logToUI).toBeCalledTimes(1);
    expect(options.logToServer).toBeCalledTimes(1);
    expect(options.logToConsole).toBeCalledTimes(0);

    /**
     * check default behaviour for:
     *  - middleware in prod environment
     *  - LogLevel is equal `Log`
     * */
    store.dispatch(secondAction);

    expect(store.getActions()).toEqual([firstAction, secondAction]);

    expect(options.logToUI).toBeCalledTimes(2);
    expect(options.logToServer).toBeCalledTimes(2);
    expect(options.logToConsole).toBeCalledTimes(1);
  });

  it('should print default tex type to console according to log level', () => {
    const options = {
      shouldLogToConsole: jest.fn(() => true),
    };

    const errorMiddleware = createMiddleware(options);
    const mockstore = testUtils.createMockStore([thunkMiddleware, errorMiddleware]);
    const store = mockstore();

    // check for Error and Critical log level
    const errorError = createTestError(LogLevel.Error, {}, {});
    store.dispatch(errorAction(errorError));
    expect(spyConsoleLog).toBeCalledTimes(0);
    expect(spyConsoleInfo).toBeCalledTimes(0);
    expect(spyConsoleError).toBeCalledTimes(1);

    const criticalError = createTestError(LogLevel.Critical, {}, {});
    store.dispatch(errorAction(criticalError));
    expect(spyConsoleLog).toBeCalledTimes(0);
    expect(spyConsoleInfo).toBeCalledTimes(0);
    expect(spyConsoleError).toBeCalledTimes(2);

    // check for Info log level
    const infoError = createTestError(LogLevel.Info, {}, {});
    store.dispatch(errorAction(infoError));
    expect(spyConsoleLog).toBeCalledTimes(0);
    expect(spyConsoleInfo).toBeCalledTimes(1);
    expect(spyConsoleError).toBeCalledTimes(2);

    // check for default / empty log level
    const logError = createTestError(LogLevel.Log, {}, {});
    store.dispatch(errorAction(logError));
    expect(spyConsoleLog).toBeCalledTimes(1);
    expect(spyConsoleInfo).toBeCalledTimes(1);
    expect(spyConsoleError).toBeCalledTimes(2);

    const debugError = createTestError(LogLevel.Debug, {}, {});
    store.dispatch(errorAction(debugError));
    expect(spyConsoleLog).toBeCalledTimes(2);
    expect(spyConsoleInfo).toBeCalledTimes(1);
    expect(spyConsoleError).toBeCalledTimes(2);
  });

  it('should support custom options for middleware', () => {
    const options = {
      shouldLogToUI: jest.fn(() => true),
      shouldLogToConsole: jest.fn(() => true),
      shouldLogToServer: jest.fn(() => true),
      logToUI: jest.fn(),
      logToServer: jest.fn(),
      logToConsole: jest.fn(),
    };

    const errorMiddleware = createMiddleware(options);
    const mockstore = testUtils.createMockStore([thunkMiddleware, errorMiddleware]);
    const store = mockstore();

    const error = createTestError(LogLevel.Error, {}, {});
    store.dispatch(errorAction(error));

    Object.values(options).forEach((method) => {
      expect(method).toBeCalledTimes(1);
    });
  });

  it('should catch and handle redux internal exceptions to prevent infinity loop', () => {
    const errorMiddleware = createMiddleware();
    const mockstore = testUtils.createMockStore([thunkMiddleware, errorMiddleware]);
    const store = mockstore();

    const invalidReduxAction = () => ({
      typee: IDLE, // oopps typo
      payload: {},
    });

    const expectedActions = [
      reportInternalReduxError(
        new Error(
          'Actions may not have an undefined "type" property. Have you misspelled a constant? Action: {"typee":"IDLE","payload":{}}',
        ),
      ),
    ];

    store.dispatch(invalidReduxAction());

    expect(store.getActions()).toEqual(expectedActions);
  });
});
