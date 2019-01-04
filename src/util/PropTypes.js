import PropTypes from 'prop-types';

export const HOCRequestPropTypes = PropTypes.shape({
  data: PropTypes.any,
  error: PropTypes.any,
  lastError: PropTypes.number,
  lastFetch: PropTypes.number,
  loading: PropTypes.bool.isRequired,
});