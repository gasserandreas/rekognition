import { setAWSConfig } from '../common/services/aws';

import { fetchImages } from './images';

// action types
const APPLICATION_DID_LOAD = 'APPLICATION_DID_LOAD';
const APPLICATION_USER_SET = 'APPLICATION_USER_SET';

// simple actions
const applicationDidLoad = () => ({
  type: APPLICATION_DID_LOAD,
});

// complex actions
const initApplication = () => (dispatch) => {
  
  // init aws
  const awsConfig = {
    accessKeyId: process.env.REACT_APP_AWS_DEFAULT_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_DEFAULT_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_AWS_DEFAULT_REGION,
  };
  // init AWS
  setAWSConfig({ awsConfig, userId: process.env.REACT_APP_AWS_USER_ID });

  // load images
  fetchImages()(dispatch);

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