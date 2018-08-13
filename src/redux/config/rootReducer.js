import { combineReducers } from 'redux';

import applicationReducer from '../application';
import drawerReducer from '../drawer';
import authReducer from '../auth';
import imagesReducer from '../images';

const reducers = combineReducers({
  application: applicationReducer,
  drawer: drawerReducer,
  auth: authReducer,
  images: imagesReducer,
});

export default reducers;
