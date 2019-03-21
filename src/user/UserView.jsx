import React, { Component, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Box, Heading, Paragraph, ResponsiveContext } from 'grommet';

import UpdateUserForm from './UpdateUserForm';

import View from '../ui/View';
import Card from '../ui/Card';
import Button from '../ui/form/Button';

import AsyncContainer from '../ui/async/AsyncContainer';
import { HOCRequestPropTypes } from '../util/PropTypes';

import { getDefaultFormatedDate } from '../util/util';
import * as Paths from '../paths';

const UserView = ({
  user,
  authMeta,
  getUserInfoRequest,
  updateUserRequest,
  updateUser,
  getUserInfo,
  logOutUser,
}) => {
  const { 
    firstname,
    lastname,
  } = user;

  const {
    loggedInSince,
    remember,
  } = authMeta;

  useEffect(() => {
    const { loading, lastError, lastFetch } = getUserInfoRequest;
    if (!loading && lastError === null && lastFetch === null) {
      getUserInfo();
    }
  });

  return (
    <View>
      <Card>
        <Heading level="4" margin={{ top: 'small', bottom: 'none' }}>Profile information</Heading>
        <Paragraph size="small" margin={{ bottom: 'none' }}>Update your basic profile information.</Paragraph>
        <AsyncContainer loading={getUserInfoRequest.loading}>
          <UpdateUserForm
            user={{ firstname, lastname }}
            onSubmit={updateUser}
            submitting={updateUserRequest.loading}
            error={updateUserRequest.error ? updateUserRequest.error.message : null}
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
              <Paragraph size="small" margin={{ bottom: 'none' }}>
                <strong>Privacy information: </strong>
                Click <Link to={Paths.PRIVACY}>here</Link> to view our privacy policy
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
                  onClick={logOutUser}
                >Logout</Button>
              </Box>
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
      </Card>
  </View>
  );
};

UserView.propTypes = {
  user: PropTypes.shape({}).isRequired,
  authMeta: PropTypes.shape({
    loggedInSince: PropTypes.number,
    remember: PropTypes.bool,
  }).isRequired,
  getUserInfoRequest: HOCRequestPropTypes.isRequired,
  updateUserRequest: HOCRequestPropTypes.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  logOutUser: PropTypes.func.isRequired,
};

UserView.defaultProps = {};

export default UserView;
