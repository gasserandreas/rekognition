import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from './App';

// redux
import { logOutUser } from '../redux/auth';
import { isAuthenticatedSelector, authUsernameSelector } from '../redux/auth/selectors';

import { applicationDidLoadSelector } from '../redux/application/selectors';
import {
  messageShowSelector,
  messageTextSelector,
  messageTitleSelector,
  messageShowRefreshSelector,
} from '../redux/application/message/selectors';

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticatedSelector(state),
  didLoad: applicationDidLoadSelector(state),
  username: authUsernameSelector(state),
  message: {
    show: messageShowSelector(state),
    text: messageTextSelector(state),
    title: messageTitleSelector(state),
    showRefresh: messageShowRefreshSelector(state),
  },
});

const mapDispatchToProps = {
  logOutUser,
};

export const __testables__ = {
  mapStateToProps,
  mapDispatchToProps,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
);
