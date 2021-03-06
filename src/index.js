/* eslint-disable react/jsx-filename-extension */
import 'react-app-polyfill/ie9'; // eslint-disable-line import/no-extraneous-dependencies

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import AppContainer from './app/AppContainer';
import * as serviceWorker from './serviceWorker';

import getStore from './redux/getStore';

// create store object
const { store, persistor } = getStore();

// persistor.purge();

class Index extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <AppContainer />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
