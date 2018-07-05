import * as ErrorTypes from './ErrorTypes';

import networkEndpoints from '../services/network_endpoints.json';

// error creators
const createError = (type, message, title, ui, log, error, payload) => ({
  handled: true,
  type,
  message,
  title: title || '',
  ui: ui || true,
  log: log || true,
  error,
  payload,
});

const createNetworkError = (error, response) => {
  const message = error.message;
  const title = 'Network Error';

  return createError(
    ErrorTypes.NetworkError,
    message,
    title,
    true,
    true,
    error,
    response,
  );
};

const createInvalidDataError = (error, data) => {
  const message = error.message;
  const title = 'Invalid data';

  return createError(
    ErrorTypes.InvalidDataError,
    message,
    title,
    false,
    true,
    error,
    data,
  );
};

const createUncaughtPromiseError = (reason) => {
  const message = 'Internal application error: Uncaught promise in code detected';
  const title = 'Internal application error';

  return createError(
    ErrorTypes.UncaughtPromiseError,
    message,
    title,
    false,
    true,
    undefined,
    reason,
  );
};

const createCustomError = (message, title, error, payload = undefined) => createError(
  ErrorTypes.CustomError,
  message,
  title,
  true,
  true,
  error,
  payload,
);

const createUnknownError = (error, payload = error) => createError(
  ErrorTypes.UnknownError,
  'Unhandled exception detected, please restart application and try again later',
  'Caught unhandled exception',
  true,
  true,
  error,
  payload,
);

// log to server
const logToServer = (error) => {
  const url = networkEndpoints.log;

  const config = {
    method: 'POST',
    cors: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(error),
  };

  fetch(url, config)
    .then((response) => {
      const { ok, status } = response;

      // stop here
      if (!ok || status !== 200) {
        return Promise.reject(response);
      }

      console.log('[Log success] Sent error to logging service');
      return true;
    })
    .catch((response) => {
      // stop here, do not rethrow that error --> while(true) loop
      console.error('--- WARNING ---');
      console.error('Error could NOT been send to logging service! \n Please check your logging service and logging configuration');
      console.error('Server response', response);
    });
};

export {
  logToServer,
  createUnknownError,
  createNetworkError,
  createInvalidDataError,
  createCustomError,
  createUncaughtPromiseError,
};
