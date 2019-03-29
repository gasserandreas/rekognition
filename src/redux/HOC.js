import { createNetworkError } from '../util/ErrorHandler';

// utils
export const hocCreateTypes = (baseType) => ({
  START: `${baseType}_START`,
  SUCCESS: `${baseType}_SUCCESS`,
  ERROR: `${baseType}_ERROR`,
});

const checkHocTypes = types => {
  const { START, SUCCESS, ERROR } = types;

  if (!START || !SUCCESS || !ERROR) {
    return false;
  }

  if (START.indexOf('START') < 0) {
    return false;
  }

  if (SUCCESS.indexOf('SUCCESS') < 0) {
    return false;
  }

  if (ERROR.indexOf('ERROR') < 0) {
    return false;
  }

  return true;
};

// actions
export const hocAsyncAction = (ACTION_TYPE, createThunk, userOptions) => {
  // basic check
  if (!checkHocTypes(ACTION_TYPE)) {
    console.log(`No valid types specified for ${JSON.stringify(ACTION_TYPE)}`);
    throw new Error('No valid ACTION_TYPE specified');
  }

  // actual HOC action
  return (...args) => {
    const { rejectable, handled } = {
      rejectable: false,
      handled: true,
      ...userOptions,
    };

    // create function for passed properties / args
    const thunk = createThunk(...args);

    return (dispatch) => {
      // start async job
      dispatch({ type: ACTION_TYPE.START });

      // except to receive promise from create thunk method
      return dispatch(thunk)
        // proceed with success
        .then(payload => {
          dispatch({
            type: ACTION_TYPE.SUCCESS,
            payload,
          });

          return Promise.resolve(payload);
        })
        // proceed with error
        .catch((error) => {
          dispatch({
            type: ACTION_TYPE.ERROR,
            payload: createNetworkError(error),
            error: handled, // only flag as error if not rejectable
          });

          // only reject error if asked by user
          if (rejectable) return Promise.reject(error);
        });
    }
  };
};

// export reducer
export default ({
  ACTION_TYPE,
  noData,
  initialState,
}) => {
  // basic check
  if (!checkHocTypes(ACTION_TYPE)) {
    console.log(`No valid types specified for ${JSON.stringify(ACTION_TYPE)}`);
    throw new Error('No valid ACTION_TYPE specified');
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
          ...(initialState || defaultInitialState),
          data: noData ? null : action.payload,
          lastFetch: Date.now(),
        };
      case ACTION_TYPE.ERROR:
        return {
          ...(initialState || defaultInitialState),
          lastError: Date.now(),
          error: action.payload,
          loading: false,
        };
      default:
        // console.log(state);
        return state;
    }
  };
};

export const __testables__ = {
  checkHocTypes,
};
