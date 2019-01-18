import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Heading, Paragraph } from 'grommet';

import UpdateUserForm from './UpdateUserForm';

import { View } from '../ui/View';
import Card from '../ui/Card';

// const UserView = (props) => {
class UserView extends Component {
  componentWillMount() {
    console.log(this.props);
  }

  render() {
    const {
      user,
      updateUser,
    } = this.props;

    return (
      <View>
          <Heading level="4" margin={{ bottom: 'small' }}>Profile information</Heading>
          <Card>
            <Paragraph size="small" margin={{ bottom: 'none' }}>Update your basic profile information.</Paragraph>
            <UpdateUserForm
              user={{ firstname: '', lastname: '' }}
              onSubmit={updateUser}
              // onCancel={this.onCancelSignUp}
              // submitting={signupRequest.loading}
              submitting={false}
              // error={signupRequest.error ? signupRequest.error.message : null}
              error={null}
            />
          </Card>
          <p>
            Profile
          </p>
      </View>
    );
  }
}

UserView.propTypes = {
  user: PropTypes.shape({}),
  updateUser: PropTypes.func.isRequired,
};

UserView.defaultProps = {
  user: null,
};

export default UserView;
