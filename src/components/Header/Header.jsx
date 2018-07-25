import React from 'react';
import PropTypes from 'prop-types';

import Badge from '../Badge/Badge';

import './Header.css';

const Header = ({ user }) => {
  return (
    <header>
      <h1 className="application-title">AWS Rekognition</h1>
      { user && (
        <div className="user-info">
          <div className="user-name">{user.firstname} {user.lastname}</div>
          <Badge text={user.shortname} />
        </div>
      )}
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    shortname: PropTypes.string.isRequired,
  }),
}

Header.defaultProps = {
  user: undefined,
};

export default Header;
