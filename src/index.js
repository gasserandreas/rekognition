import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { debounce } from 'lodash';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './redux/config/configureStore';
import configureReactors from './redux/reactors/configureReactors';
import { APP_IDLE } from './redux/app';

import ErrorBoundaryContainer from './common/error/ErrorBoundaryContainer';
import { addUnhandledPromiseCatcher } from './common/error/errorHandler';

// create store object
const { store, persistor } = configureStore();

// add reactors
store.subscribe(configureReactors(store));

// idle configuration
const idleDispatcher = () => {
  store.dispatch({ type: APP_IDLE });
};

// debounce every 30 seconds
const deBounced = debounce(() => {
  // The requestAnimationFrame ensures it doesn't run when tab isn't active
  // the requestIdleCallback makes sure the browser isn't busy with something
  // else.
  requestAnimationFrame(() => 
    // this timeout option for requestIdleCallback is a maximum amount of time
    // to wait. I'm including it here since there have been a few browser bugs where
    // for various reasons browsers fail to trigger idle callbacks without this argument.
    requestIdleCallback(idleDispatcher, { timeout: 500 })
  )
}, 30000);

// Now this will run *each time* something
// is dispatched. But once it's been 30 seconds
// since something has happened. It will cause
// its *own* dispatch. Which then start the cycle
// over again.
store.subscribe(deBounced)

// add error handler
addUnhandledPromiseCatcher(store);

// dummy
// persistor.purge();

class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ErrorBoundaryContainer>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ErrorBoundaryContainer>
        </PersistGate>
      </Provider>
    );
  }
}

export { persistor };

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
