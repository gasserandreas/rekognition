import { connect } from 'react-redux';

import { openDrawer } from '../../redux/drawer';

import Navigation from './Navigation';

const mapStateToProps = ({ drawer }) => {
  const { open } = drawer;

  return {
    drawer: {
      open,
    },
  };
};

const mapDispatchToProps = ({
  openDrawer,
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
