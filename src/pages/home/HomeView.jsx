import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as Paths from '../../routes/paths';

class HomeView extends Component {
  static propTypes = {
    didLoad: PropTypes.bool.isRequired,
    user: PropTypes.shape({}).isRequired,
  };

  render() {
    const { didLoad } = this.props;

    return (
      <div className="details-view">
        <h1>Home View</h1>
        { didLoad
          ? <p>Application is initialized</p>
          : <p>Loading...</p> }
        <Link to={Paths.DETAIL}>Go to detail page</Link>
      </div>
    );
  }
}

export default HomeView;
