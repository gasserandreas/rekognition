import { useEffect } from 'react';

export const createUseIsAuthenticatedHistoryPush = path => (isAuthenticated, history) => {
  useEffect(() => {
    let timeout;

    if (isAuthenticated) {
      setTimeout(() => {
        history.push(path);
      }, 300);
    }

    // clean up timeout
    return () => {
      timeout && clearTimeout(timeout);
    }
  });
};
