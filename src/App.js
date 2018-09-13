import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AppHeader from './routes/main/AppHeader/AppHeader';
import AppLoadingBar from './routes/main/AppLoadingBar/AppLoadingBarContainer';
import footerRoutes from './routes/main/AppFooter/routes';
import uploadRoutes from './routes/main/UploadButton/routes';

import appRoutes from './routes/main/routes';

import { initApplication } from './redux/app';
import { fetchImages } from './redux/images';

import './App.css';

class App extends Component {
  componentWillMount() {
    this.props.initApplication();
  }

  render() {
    return (
      <section className="app-wrapper">
        <AppLoadingBar />
        <AppHeader />
        <section className="app-content">
          {appRoutes()}
        </section>
        {footerRoutes()}
        {uploadRoutes()}
      </section>
    );
  }
}


const select = state => {
  console.log(state);
  return {};
};

const mapDispatchToProps = ({
  initApplication,
  fetchImages,
});

// ATTENTION: withRouter is needed to get React router proper update location!!
export default withRouter(connect(select, mapDispatchToProps)(App));
