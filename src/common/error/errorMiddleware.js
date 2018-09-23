import { createUnknownError, logToServer } from './errorUtils';

// redux stuff
const ERROR = 'ERROR';

const handleError = error => ({
  type: ERROR,
  error,
});

const errorMiddleware = store => next => (action) => {
  try {
    // catch error here
    if (action.type === ERROR) {
      throw action.error;
    }

    return next(action); // dispatch
  } catch (catchedError) {
    let error = catchedError;

    // check if already handled
    if (!error.handled) {
      error = createUnknownError(error);
    }

    // log to console
    console.error('Caught an exception!', error);
    console.error(error.payload);

    // do ui stuff
    if (error.ui) {
      // TODO: add UI dispatcher (like notification center)
      // console.log('log to ui');
    }

    // do log stuff
    if (error.log) {
      // TODO: add server logging
      logToServer(error);
    }

    return false;
  }
};

export {
  handleError,
};

export default errorMiddleware;
