import { connect } from 'react-redux';

import ErrorBoundary from './ErrorBoundary';

import { handleError } from './errorMiddleware';

const mapStateToProps = () => ({});

const mapDispatchToProps = ({
  dispatchError: handleError,  
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary);

