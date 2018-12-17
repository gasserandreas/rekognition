/* global requestAnimationFrame */
import { combineReducers } from 'redux';

import applicationReducer from './application';

const reducers = combineReducers({
  appTime: Date.now,
  application: applicationReducer,
});

export default reducers;
