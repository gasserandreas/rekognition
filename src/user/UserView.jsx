import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box, Heading, Paragraph, ResponsiveContext } from 'grommet';

import UpdateUserForm from './UpdateUserForm';

import View from '../ui/View';
import Card from '../ui/Card';
import Button from '../ui/form/Button';

import AsyncContainer from '../ui/async/AsyncContainer';
import { HOCRequestPropTypes } from '../util/PropTypes';

import { getDefaultFormatedDate } from '../util/util';

class UserView extends Component {
  componentWillMount() {
    const { getUserInfoRequest, getUserInfo } = this.props;
    const { loading } = getUserInfoRequest;

    if (!loading) {
      getUserInfo();
    }
  }

  render() {
    const {
      user,
      authMeta,
      getUserInfoRequest,
      updateUser,
    } = this.props;

    const { 
      firstname,
      lastname,
      email,
    } = user;

    const {
      loggedInSince,
      remember,
    } = authMeta;

    return (
      <View>
          <Card>
            <Heading level="4" margin={{ top: 'small', bottom: 'none' }}>Profile information</Heading>
            <Paragraph size="small" margin={{ bottom: 'none' }}>Update your basic profile information.</Paragraph>
            <AsyncContainer loading={getUserInfoRequest.loading}>
              <UpdateUserForm
                user={{ firstname, lastname }}
                onSubmit={updateUser}
                // submitting={signupRequest.loading}
                submitting={false}
                // error={signupRequest.error ? signupRequest.error.message : null}
                error={null}
              />
            </AsyncContainer>
          </Card>
          <Card>
          <Heading level="4" margin={{ top: 'small', bottom: 'none' }}>Current session</Heading>
          <ResponsiveContext.Consumer>
            {size => (
              <Box direction={size === 'small' ? 'column' : 'row'}>
                <Box basis={size === 'small' ? '1' : '1/2'}>
                  <Paragraph size="small" margin={{ bottom: 'none' }}>
                    <strong>Logged in since:</strong>
                    {' '}
                    {loggedInSince ? getDefaultFormatedDate(loggedInSince) : 'unknown'}
                  </Paragraph>
                  <Paragraph size="small" margin={{ bottom: 'none' }}>
                    <strong>Auto login:</strong> {remember ? 'enabled' : 'disabled'}
                  </Paragraph>
                </Box>
                <Box
                  direction="row"
                  basis={size === 'small' ? '1' : '1/2'}
                  align="baseline"
                >
                  <Box basis="2/3">
                    <Paragraph size="small" margin={{ bottom: 'none' }}><strong>Note:</strong> Logout will clear all information from your device.</Paragraph>
                  </Box>
                  <Box basis="1/3" align="end">
                    <Button
                      buttonStyle="error"
                      onClick={() => this.props.logOutUser()}
                    >Logout</Button>
                  </Box>
                </Box>
              </Box>
            )}
          </ResponsiveContext.Consumer>
          </Card>
      </View>
    );
  }
}

UserView.propTypes = {
  user: PropTypes.shape({}).isRequired,
  authMeta: PropTypes.shape({
    loggedInSince: PropTypes.string,
    remember: PropTypes.bool,
  }).isRequired,
  getUserInfoRequest: HOCRequestPropTypes.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  logOutUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
};

UserView.defaultProps = {};

export default UserView;
