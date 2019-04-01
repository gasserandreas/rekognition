/* global requestAnimationFrame */
import { combineReducers } from 'redux';

import applicationReducer, { APP_RESET } from './application';
import authReducer from './auth';
import imagesReducer from './images';
import labelsReducer from './labels';
import facesReducer from './faces';
import userReducer from './user';

const reducers = combineReducers({
  appTime: Date.now,
  application: applicationReducer,
  auth: authReducer,
  images: imagesReducer,
  labels: labelsReducer,
  faces: facesReducer,
  user: userReducer,
});

const rootReducer = (state, action) => {
  let usedState = state;

  // handle reset
  if (action.type === APP_RESET) {
    usedState = undefined;
  }

  return reducers(usedState, action);
}

export default rootReducer;
