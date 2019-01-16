/* global requestAnimationFrame */
import { combineReducers } from 'redux';

import applicationReducer from './application';
import authReducer from './auth';
import imagesReducer from './images';
import labelsReducer from './labels';
import facesReducer from './faces';

import playgroundReducer from './playground';

const reducers = combineReducers({
  appTime: Date.now,
  application: applicationReducer,
  auth: authReducer,
  images: imagesReducer,
  labels: labelsReducer,
  faces: facesReducer,
  playground: playgroundReducer,
});

export default reducers;
