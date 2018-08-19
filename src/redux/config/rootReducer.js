import { combineReducers } from 'redux';

import applicationReducer from '../application';
import drawerReducer from '../drawer';
import authReducer from '../auth';
import imagesReducer from '../images';
import facesReducer from '../faces';
import labelsReducer from '../labels';

const reducers = combineReducers({
  application: applicationReducer,
  drawer: drawerReducer,
  auth: authReducer,
  images: imagesReducer,
  faces: facesReducer,
  labels: labelsReducer,
});

export default reducers;
