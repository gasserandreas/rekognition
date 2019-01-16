import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { View } from '../ui/View';

import { Heading } from 'grommet';

const UserView = (props) => {
  console.log(props);
  return (
    <View>
        <Heading level="2">Profile information</Heading>
        <p>
          Profile
        </p>
    </View>
  );
};

UserView.propTypes = {
  user: PropTypes.shape({}),
};

UserView.defaultProps = {
  user: null,
};

export default UserView;
