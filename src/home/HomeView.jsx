/** @jsx jsx */
import PropTypes from 'prop-types';

import { jsx, css } from '@emotion/core';

import Page, { Grid, GridColumn } from '@atlaskit/page';
import PageHeader from '@atlaskit/page-header';

const Styles = {
};

const HomeView = (props) => {
  const { user } = props;

  const playgroundActions = [
    {
      method: props.requestNow,
      name: 'Request NOW',
    },
    {
      method: () => props.loginUser({
        email: 'andreas.safe@gmail.com',
        password: 'testtest',
      }),
      name: 'Login User',
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
            {/* <button onClick={() => props.loginUser()}>Test</button> */}
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
