import { combineReducers } from 'redux';

import applicationReducer from '../application';
import drawerReducer from '../drawer';
import authReducer from '../auth';

const reducers = combineReducers({
  application: applicationReducer,
  drawer: drawerReducer,
  auth: authReducer,
});

export default reducers;
