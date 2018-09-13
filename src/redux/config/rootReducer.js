import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import appReducer from '../app';
import networkReducer from '../network';
import imagesReducer from '../images';
import facesReducer from '../faces';

const facesPersistConfig = {
  key: 'faces',
  storage,
  blacklist: ['selected'],
};

const imagesPersistConfig = {
  key: 'images',
  storage,
  blacklist: ['selected'],
}

const reducers = combineReducers({
  appTime: Date.now,
  app: appReducer,
  network: networkReducer,
  images: persistReducer(imagesPersistConfig, imagesReducer),
  faces: persistReducer(facesPersistConfig, facesReducer),
});

export default reducers;
