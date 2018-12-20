/** @jsx jsx */
import PropTypes from 'prop-types';
import { jsx, css } from '@emotion/core';

import Page, { Grid, GridColumn } from '@atlaskit/page';
import PageHeader from '@atlaskit/page-header';

const Styles = {
};

const UserView = (props) => {
  return (
    <div>
      <Page>
        <Grid>
          <GridColumn medium={12}>
            <PageHeader>Profile information</PageHeader>
            Profile
          </GridColumn>
        </Grid>
      </Page>
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
