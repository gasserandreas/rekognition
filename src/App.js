import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import ErrorBoundary from './common/error/ErrorBoundary';
import AppHeader from './AppHeader';
import DrawerContainer from './components/Drawer/DrawerContainer';
import AppRoutes from './routes/app';

import { initApplication } from './redux/application';

import './App.css';

class App extends Component {
  componentWillMount() {
    this.props.initApplication();
  }

  render() {
    return (
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
    );
  }
}

const mapDispatchToProps = ({
  initApplication,
});

export default connect(() => ({}), mapDispatchToProps)(App);
