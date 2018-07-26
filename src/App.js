import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import ErrorBoundary from './common/error/ErrorBoundary';
import AppHeader from './AppHeader';
import DrawerContainer from './components/Drawer/DrawerContainer';
import AppRoutes from './routes/app';

import { initApplication } from './redux/application';
import configureStore from './redux/config/configureStore';

import { addUnhandledPromiseCatcher } from './common/error/errorHandler';

import './App.css';

const { store, persistor } = configureStore();
const { dispatch } = store;

// add error handler
addUnhandledPromiseCatcher(store);

// init application
dispatch(initApplication());

class App extends Component {
  render() {
    return (
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
          <ErrorBoundary>
            <BrowserRouter>
              <div className="application-wrapper">
                <AppHeader />
                <main role="main" className="content">
                  <AppRoutes />
                </main>
                {/* <Footer /> */}
                <DrawerContainer />
              </div>
            </BrowserRouter>
          </ErrorBoundary>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
