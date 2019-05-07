import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import ViewMessage from '../ui/ViewMessage';
import Button from '../ui/form/Button';
import ButtonGroup from '../ui/form/ButtonGroup';

const AppMessage = ({
  message: {
    text, show, title, showRefresh,
  },
}) => (
  <ViewMessage message={text} show={show}>
    <h1>{title}</h1>
    <p>{text}</p>
    {showRefresh && (
      <Fragment>
        <p>Please refresh page and try again. If error persists please try later.</p>
        <ButtonGroup>
          <Button type="button" buttonStyle="primary" onClick={() => window.location.reload()}>
            Refresh page
          </Button>
        </ButtonGroup>
      </Fragment>
    )}
  </ViewMessage>
);

AppMessage.propTypes = {
  message: PropTypes.shape({
    show: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    showRefresh: PropTypes.bool.isRequired,
  }).isRequired,
};

export default AppMessage;
