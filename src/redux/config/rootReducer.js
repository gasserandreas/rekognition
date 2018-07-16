import { combineReducers } from 'redux';

import applicationReducer from '../application';
import drawerReducer from '../drawer';

const reducers = combineReducers({
  application: applicationReducer,
  drawer: drawerReducer,
});

export default reducers;
