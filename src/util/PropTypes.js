import PropTypes from 'prop-types';

export const HOCRequestPropTypes = PropTypes.shape({
  data: PropTypes.any,
  error: PropTypes.any,
  lastError: PropTypes.number,
  lastFetch: PropTypes.number,
  loading: PropTypes.bool.isRequired,
});

export const ImagePropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  created: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
});
