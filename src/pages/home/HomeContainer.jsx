import { connect } from 'react-redux';

import HomeView from './HomeView';

const mapStateToProps = (state) => {
  const { application } = state;

  return {
    ...application,
  };
}

const mapDispatchToProps = ({});

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
