import { checkHocTypes } from './hocUtils';

const hocAsyncAction = (ACTION_TYPE, createThunk, rejectable = false) => (...args) => {
  // create function for passed properties / args
  const thunk = createThunk(...args);

  // basic check
  if (!checkHocTypes(ACTION_TYPE)) {
    console.log(`No valid types specified for ${JSON.stringify(ACTION_TYPE)}`);
    return Promise.reject(new Error('No valid ACTION_TYPE specified'));
  }

  return (dispatch) => {
    // start async job
    dispatch({ type: ACTION_TYPE.START });

    // except to receive promise from create thunk method
    // return thunk()
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
          error,
        });

        // only reject error if asked by user
        if (rejectable) return Promise.reject(error);
      });
  }
};

export {
  hocAsyncAction,
};
