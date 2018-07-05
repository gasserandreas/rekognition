// action types
const APPLICATION_DID_LOAD = 'APPLICATION_DID_LOAD';
const APPLICATION_USER_SET = 'APPLICATION_USER_SET';

// simple actions
const applicationDidLoad = () => ({
  type: APPLICATION_DID_LOAD,
});

const applicationUserSet = (user) => ({
  type: APPLICATION_USER_SET,
  user,
});

// complex actions
const initApplication = () => (dispatch) => {
  // dispatch(applicationUserSet(user));
  dispatch(applicationDidLoad());
};

// reducers
const didLoad = (state = false, action) => {
  switch (action.type) {
    case APPLICATION_DID_LOAD:
      return true;
    default:
      return state;
  }
};

const applicationUser = (state = {}, action) => {
  switch (action.type) {
    case APPLICATION_USER_SET:
      return action.user;
    default:
      return state;
  }
}

const applicationReducer = (state = {}, action) => ({
  didLoad: didLoad(state.didLoad, action),
  user: applicationUser(state.user, action),
});

export {
  initApplication,
}

export default applicationReducer;