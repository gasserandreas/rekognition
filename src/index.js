import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './redux/config/configureStore';
import { addUnhandledPromiseCatcher } from './common/error/errorHandler';

// import css stylesheets
import './index.css';
import '../node_modules/@fortawesome/fontawesome-pro/css/all.css';

const { store, persistor } = configureStore();

// add error handler
addUnhandledPromiseCatcher(store);

class Application extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>           
          <App />
        </PersistGate>
      </Provider>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById('root'));
registerServiceWorker();
