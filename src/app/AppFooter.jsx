import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import Footer from '../ui/Footer';

import * as Paths from '../paths';

const isAlternativeColor = (path) => {
  if (path.includes(Paths.LOGIN)) {
    return true;
  }

  if (path.includes(Paths.REGISTER)) {
    return true;
  }

  return false;
}

const AppFooter = ({
  history: {
    location: {
      pathname,
    }
  },
}) => {
  const withSidebar = pathname.includes(Paths.GET_IMAGES_DETAIL(''));
  const alternativeColor = isAlternativeColor(pathname);

  return (
    <Footer
      withSidebar={withSidebar}
      alternativeColor={alternativeColor}
    />
  );
};

AppFooter.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withRouter(AppFooter);
