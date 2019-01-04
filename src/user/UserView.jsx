import React from 'react';
import PropTypes from 'prop-types';

import { Heading } from 'grommet';

const UserView = (props) => {
  return (
      <div>
        <Heading level="2">Profile information</Heading>
        <p>
          Profile
        </p>
    </div>
  );
};

UserView.propTypes = {
  user: PropTypes.shape({}),
};

UserView.defaultProps = {
  user: null,
};

export default UserView;
