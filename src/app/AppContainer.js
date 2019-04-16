import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import App from './App';

// redux
import { logOutUser } from '../redux/auth';
import { isAuthenticatedSelector, authUsernameSelector } from '../redux/auth/selectors';

import { loadApplication } from '../redux/application';
import {
  messageShowSelector,
  messageTextSelector,
  messageTitleSelector,
  messageShowRefreshSelector,
} from '../redux/application/message/selectors';

const mapStateToProps = (state) => ({
  isAuthenticated: isAuthenticatedSelector(state),
  username: authUsernameSelector(state),
  message: {
    show: messageShowSelector(state),
    text: messageTextSelector(state),
    title: messageTitleSelector(state),
    showRefresh: messageShowRefreshSelector(state),
  },
});

const mapDispatchToProps = ({
  loadApplication,
  logOutUser,
});

export const __testables__ = {
  mapStateToProps,
  mapDispatchToProps,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
