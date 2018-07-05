import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';

import ErrorBoundary from './common/error/ErrorBoundary';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
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

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ErrorBoundary>
          <BrowserRouter>
            <div className="application-wrapper">
              <Header />
              <main role="main" className="content">
                <AppRoutes />
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </ErrorBoundary>
      </Provider>
    );
  }
}

export default App;
