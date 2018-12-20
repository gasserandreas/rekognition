/** @jsx jsx */
import PropTypes from 'prop-types';
import { jsx, css } from '@emotion/core';

import Page, { Grid, GridColumn } from '@atlaskit/page';
import PageHeader from '@atlaskit/page-header';

const Styles = {

}

const ImagesView = (props) => {
  return (
    <div>
      <Page>
        <Grid>
          <GridColumn medium={12}>
            <PageHeader>Image collection</PageHeader>
            ImageView
          </GridColumn>
        </Grid>
      </Page>
    </div>
  );
};

ImagesView.propTypes = {
  user: PropTypes.shape({}),
};

ImagesView.defaultProps = {
  user: null,
};

export default ImagesView;
