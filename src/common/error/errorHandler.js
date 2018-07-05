import { handleError } from './errorMiddleware';
import { createUncaughtPromiseError } from './errorUtils';

const addUnhandledPromiseCatcher = (store) => {
  // chrome only
  window.addEventListener('unhandledrejection', (event) => {
    const error = createUncaughtPromiseError(event.reason);

    console.error('Unhandled rejection (promise: ', event.promise, ', reason: ', event.reason, ').');
    
    store.dispatch(handleError(error));

    // stop here
    event.preventDefault();

    return false;
  });
};

export {
  // addGlobalErrorHandler,
  addUnhandledPromiseCatcher,
};
