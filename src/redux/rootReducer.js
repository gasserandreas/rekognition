/* global requestAnimationFrame */
import { combineReducers } from 'redux';

import applicationReducer from './application';
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

export default reducers;
