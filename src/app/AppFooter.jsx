import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import Footer from '../ui/Footer';

import * as Paths from '../paths';

const isAlternativeColor = (pathname) => {
  if (pathname.includes(Paths.LOGIN)) {
    return true;
  }

  if (pathname.includes(Paths.REGISTER)) {
    return true;
  }

  return false;
}

const isWithSidebar = pathname => pathname.includes(Paths.GET_IMAGES_DETAIL(''));

const AppFooter = ({
  history: {
    location: {
      pathname,
    }
  },
}) => {
  const withSidebar = isWithSidebar(pathname);
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

export const __testables__ = {
  isWithSidebar,
  isAlternativeColor,
  AppFooter,
}

export default withRouter(AppFooter);
