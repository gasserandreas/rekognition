import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GoogleAnalytics from 'react-ga';

import AppHeader from './routes/main/AppHeader/AppHeader';
import AppLoadingBar from './routes/main/AppLoadingBar/AppLoadingBarContainer';
import footerRoutes from './routes/main/AppFooter/routes';
import uploadRoutes from './routes/main/UploadButton/routes';

import appRoutes from './routes/main/routes';

import { initApplication } from './redux/app';
import { fetchImages } from './redux/images';

import './App.css';

class App extends Component {
  state = {
    enabledAnalytics: false,
  };

  componentWillMount() {
    this.props.initApplication();

    // enable analytics
    this.initGoogleAnalytics(this.props);
  }

  initGoogleAnalytics(props) {
    const key = process.env.REACT_APP_GOOGLE_ANALYTICS_KEY;

    if (!key || key === '') {
      return;
    }

    // analytics only on prod
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    // init GA
    GoogleAnalytics.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_KEY);

    // call init analytics
    GoogleAnalytics.pageview(this.getPage(props));

    this.setState({
      enabledAnalytics: true,
    });
  }

  componentWillReceiveProps(newProps) {
    const page = this.getPage(this.props);
    const newPage = this.getPage(newProps);

    if (page !== newPage) {
      GoogleAnalytics.pageview(page);
    }
  }

  getPage(props) {
    const { location } = props;
    const { pathname, search } = location;
    return `${pathname}${search}`;
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
