/** @jsx jsx */
import PropTypes from 'prop-types';

import { jsx, css } from '@emotion/core';

import Page, { Grid, GridColumn } from '@atlaskit/page';
import PageHeader from '@atlaskit/page-header';

import * as Paths from '../paths';

const HomeView = (props) => {
  const { user } = props;

  const playgroundActions = [
    {
      method: props.requestNow,
      name: 'Request NOW',
    },
    {
      method: () => props.logInUser({
        email: 'andreas.safe@gmail.com',
        password: 'testtest',
        remember: true,
      }),
      name: 'Login User',
    },
    {
      method: () => props.logOutUser(),
      name: 'Logout User',
    },
    {
      method: () => props.getUserInfo('64511a6f-fc7c-41fc-bd81-ab3019137404'),
      name: 'User Info',
    },
    {
      method: () => props.history.push(Paths.LOGIN),
      name: 'Navigate to login',
    },
  ]

  return (
    <div>
      <Page>
        <Grid>
          <GridColumn medium={12}>
            <PageHeader>Home page</PageHeader>
            Home Page
            {playgroundActions.map((item, i) => (
              <div key={`item_${i}`}>
                <p><strong>{item.name}</strong></p>
                <button onClick={item.method}>Execute action</button>
                <br /><br />
              </div>
            ))}
          </GridColumn>
        </Grid>
      </Page>
    </div>
  );
};

HomeView.propTypes = {
  user: PropTypes.shape({}),
};

HomeView.defaultProps = {
  user: null,
};

export default HomeView;
