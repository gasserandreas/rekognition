import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';

import ErrorBoundary from './common/error/ErrorBoundary';
import AppHeader from './AppHeader';
// import Header from './components/Header/Header';
// import NavigationContainer from './components/Navigation/NavigationContainer';
import DrawerContainer from './components/Drawer/DrawerContainer';
// import Footer from './components/Footer/Footer';
import AppRoutes from './routes/app';

import { initApplication } from './redux/application';
import configureStore from './redux/config/configureStore';

import { addUnhandledPromiseCatcher } from './common/error/errorHandler';

import './App.css';

const store = configureStore();
const { dispatch } = store;

// add error handler
addUnhandledPromiseCatcher(store);

// init application
dispatch(initApplication());

// check initial auth
// const { auth } = store.getState();
// const { user, isAuthenticated } = auth;

// const user = {
//   firstname: 'Andreas',
//   name: 'Gasser',
//   shortname: 'AG',
// };

class App extends Component {
  render() {
    return (
      <Provider store={store}>
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
      </Provider>
    );
  }
}

export default App;
