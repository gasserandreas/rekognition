import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as Paths from '../../../enums/Paths';

import { selectUser } from '../../../redux/selectors/app';

import './AppHeader.css';

class AppHeader extends Component {
  static propTypes = {
    user: PropTypes.shape({
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      shortName: PropTypes.string.isRequired,
    }),
  }
  static defaultProps = {
    user: null,
  }

  renderDefaultHeader() {
    const { user } = this.props;
    return (
      <Link className="user" to={`${Paths.GET_USER_PATHS(user.id)}`}>
          <span className="fullname">{user.firstname} <i className="fas fa-user"></i></span>
          <span className="shortname">{user.shortName}</span>
      </Link>
    )
  }

  render() {
    const { user } = this.props;
    const className =  user ? 'fixed' : '';
    return (
      <header aria-label="app-header" className={className}>
        <div className="brand-section">
          <div className="brand">
            <Link to={Paths.INDEX}>REK0</Link>
          </div>
          <div className="navigation">
            {/* <Link to={Paths.IMAGES}>Images</Link> */}
          </div>
        </div>
        {user && this.renderDefaultHeader()}
      </header>
    );
  }
}

const select = state => ({
  user: selectUser(state),
});

const mapDispatchToProps = ({});

export default connect(select, mapDispatchToProps)(AppHeader);
