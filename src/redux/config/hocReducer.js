import { checkHocTypes } from './hocUtils';

export default ({
  ACTION_TYPE,
  noData,
  initialState,
}) => {
  // basic check
  if (!checkHocTypes(ACTION_TYPE)) {
    console.log(`No valid types specified for ${JSON.stringify(ACTION_TYPE)}`);
    return Promise.reject(new Error('No valid ACTION_TYPE specified'));
  }

  const defaultInitialState = {
    data: null,
    // timestamp of last error
    lastError: null,
    // actual error object
    error: null,
    // timestamp of last successful request
    lastFetch: null,
    // a flat to check whether currently loading
    loading: false,
  };

  // hoc reducer stuff
  return (state = initialState || defaultInitialState, action) => {
    switch (action.type) {
      case ACTION_TYPE.START:
        return {
          ...state,
          loading: true,
        };
      case ACTION_TYPE.SUCCESS:
        return {
          ...initialState || defaultInitialState,
          data: noData ? null : action.payload,
          lastFetch: Date.now(),
        };
      case ACTION_TYPE.ERROR:
        return {
          lastError: Date.now(),
          error: action.error,
          loading: false,
        };
      default:
        return state;
    }
  };
};
