import { useEffect } from 'react';

export const createUseIsAuthenticatedHistoryPush = path => (isAuthenticated, history) => { // eslint-disable-line import/prefer-default-export, max-len
  useEffect(() => {
    let timeout;

    if (isAuthenticated) {
      timeout = setTimeout(() => {
        history.push(path);
      }, 300);
    }

    // clean up timeout
    /**
     * Waiting for Enzyme hook support for testing
     * link: https://github.com/airbnb/enzyme/issues/2011
     */
    /* istanbul ignore next */
    return () => {
      /* istanbul ignore next */
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  });
};
