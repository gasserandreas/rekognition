/* global requestAnimationFrame */
import { combineReducers } from 'redux';

import applicationReducer from './application';
import authReducer from './auth';

import playgroundReducer from './playground';

const reducers = combineReducers({
  appTime: Date.now,
  application: applicationReducer,
  auth: authReducer,
  playground: playgroundReducer,
});

export default reducers;
