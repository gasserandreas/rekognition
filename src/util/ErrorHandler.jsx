/* eslint-disable no-console */
/**
 * Enum values for the `type` property on our enhanced errors.
 *
 * These are not Redux action types.
 */
export const ErrorTypes = {
  NetworkError: 'NetworkError',
  InvalidDataError: 'InvalidDataError',
  UncaughtPromiseError: 'UncaughtPromiseError',
  ReduxError: 'ReduxError',
  CustomError: 'CustomError',
  UnknownError: 'UnknownError',
};

export const LogLevel = {
  Debug: -1,
  Info: 0,
  Log: 1,
  Error: 2,
  Critical: 3,
};

/** Redux action type indicating an error has occurred. */
const INTERNAL_REDUX_ERROR = 'INTERNAL_REDUX_ERROR';
const REACT_ERROR = 'REACT_ERROR';
const CUSTOM_ERROR = 'CUSTOM_ERROR';

export const reportInternalReduxError = error => ({
  type: INTERNAL_REDUX_ERROR,
  payload: error,
  error: true,
});

export const reportReactError = error => ({
  type: REACT_ERROR,
  payload: error,
  error: true,
});

export const reportCustomError = error => ({
  type: CUSTOM_ERROR,
  payload: error,
  error: true,
});

// create custom errors
export const createNetworkError = (error, response) => Object.assign(
  new Error(error ? error.message : 'Unknown network error'),
  {
    type: ErrorTypes.NetworkError,
    title: 'Network error',
    payload: response,
    detail: error,
    logLevel: LogLevel.Error,
  }
);

export const createInvalidDataError = (error, data) => Object.assign(
  new Error(error ? error.message : 'Unknown data error'),
  {
    type: ErrorTypes.InvalidDataError,
    title: 'Invalid data',
    payload: data,
    detail: error,
    logLevel: LogLevel.Error,
  }
);

export const createUnknownError = (error, data = null) => Object.assign(
  new Error(error ? error.message : 'Unhandled exception detected'),
  {
    type: ErrorTypes.UnknownError,
    title: 'Caught unhandled exception',
    payload: data,
    detail: error,
    logLevel: LogLevel.Error,
  }
);

// global promise error catch
export const addUnhandledPromiseCatcher = (store) => {
  // chrome only
  window.addEventListener('unhandledrejection', (event) => {
    // const error = createUncaughtPromiseError(event.reason);
    const error = {
      ...new Error(event.reason ? event.reason : 'Internal application error: Uncaught promise in code detected'),
      title: 'Uncaught promise in code detected',
      payload: event.promise,
      detail: event,
      logLevel: LogLevel.Error,
    };

    console.error('Unhandled rejection (promise: ', event.promise, ', reason: ', event.reason, ').');

    store.dispatch(reportInternalReduxError(error));

    // stop here
    event.preventDefault();

    return false;
  });
};

export const createMiddleware = (userOptions) => {
  const options = {
    shouldLogToUI: ({ logLevel }) => logLevel >= LogLevel.Log,
    shouldLogToConsole: ({ logLevel }) => process.env.NODE_ENV !== 'production' || logLevel >= LogLevel.Error,
    shouldLogToServer: ({ logLevel }) => logLevel >= LogLevel.Log && process.env.NODE_ENV === 'production',
    logToUI: (error, dispatch, getState) => { // eslint-disable-line no-unused-vars
      // TODO: log to UI...
    },
    logToServer: (error, dispatch, getState) => { // eslint-disable-line no-unused-vars
      // TODO: let's fire User analytics
    },
    logToConsole: (error, dispatch, getState) => {
      const { logLevel } = error;
      switch (logLevel) {
        case LogLevel.Error:
        case LogLevel.Critical:
          console.error(error);
          break;
        case LogLevel.Info:
          console.info(error);
          break;
        default:
          console.log(error);
      }
    },
    // allow user to override
    ...userOptions,
  };

  const errorLogMiddleware = store => next => (action) => {
    if (!action.error) {
      /**
       * wrap next(action) into try/catch to catch any redux internal error
       */
      try {
        return next(action);
      } catch (dispatchError) {
        // Prevent infinite loop, if for some reason error reporting threw.
        if (action.type === ErrorTypes.ReduxError) {
          console.error('Exception thrown while attempting to report error.\nHalting to prevent potential infinite loop.');
          console.groupCollapsed('Error details');
          console.error('action', action);
          console.error('error', dispatchError);
          console.groupEnd();
          return; // eslint-disable-line consistent-return
        }
        // inject error back into redux
        store.dispatch(reportInternalReduxError(Object.assign(
          new Error(dispatchError.message ? dispatchError.message : `Redux error caught for ${action.type}`),
          {
            type: ErrorTypes.ReduxError,
            title: 'Caught Redux exception',
            payload: action,
            detail: dispatchError,
            logLevel: LogLevel.Error,
          }
        )));

        // stop here and wait for next dispatch cycle
        return; // eslint-disable-line consistent-return
      }
    }

    const { payload } = action;

    const {
      shouldLogToConsole,
      shouldLogToUI,
      shouldLogToServer,
      logToConsole,
      logToUI,
      logToServer,
    } = options;

    console.log(action);

    if (shouldLogToConsole(payload, store.dispatch, () => store)) {
      logToConsole(payload, store.dispatch, () => store);
    }

    if (shouldLogToUI(payload, store.dispatch, () => store)) {
      logToUI(payload, store.dispatch, () => store);
    }

    if (shouldLogToServer(payload, store.dispatch, () => store)) {
      logToServer(payload, store.dispatch, () => store);
    }

    return next(action);
  };
  return errorLogMiddleware;
};
