/** @jsx jsx */
import { Component } from 'react';
import PropTypes from 'prop-types';
import { jsx, css } from '@emotion/core';

import Page, { Grid, GridColumn } from '@atlaskit/page';

import * as Paths from '../paths';
import { Colors } from '../styles';

const Styles = {
  View: css`
    background-color: ${Colors.Blue.Background};
    color: ${Colors.White.default};
    height: 100vh;
  `,
}

class View extends Component {

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  }

  componentWillMount() {
    const { isAuthenticated } = this.props;
    this.checkAuth(isAuthenticated);
  }

  componentWillReceiveProps(newProps) {
    const { isAuthenticated } = newProps;

    if (this.props.isAuthenticated !== isAuthenticated) {
      this.checkAuth(isAuthenticated);
    }
  }

  checkAuth(isAuthenticated) {
    if (isAuthenticated) {
      this.props.history.push(Paths.INDEX);
    }
  }

  render() {
    return (
      <div css={Styles.View}>
        <Page>
          <Grid>
            <GridColumn >
              Login
            </GridColumn>
          </Grid>
        </Page>
      </div>
    );
  }
}

export default View;
