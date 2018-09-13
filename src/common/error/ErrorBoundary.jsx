import { Component } from 'react';
import PropTypes from 'prop-types';

import { createUnknownError } from './errorUtils';

class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onError: PropTypes.func,
    dispatchError: PropTypes.func.isRequired,
  }

  static defaultProps = {
    onError: () => ({}),
  }

  componentDidCatch(error, info) {
    let newError = this.props.onError(error, info);

    if (!newError) {
      // create React error for middleware
      newError = createUnknownError(error, info);
    }

    // dispatch to redux
    this.props.dispatchError(error);
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
