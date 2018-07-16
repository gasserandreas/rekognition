import { connect } from 'react-redux';

import { openDrawer, setDrawerContent } from '../../redux/drawer';

import Navigation from './Navigation';

const mapStateToProps = ({ drawer }) => {
  const { content, open } = drawer;

  return {
    drawer: {
      content,
      open,
    },
  };
};

const mapDispatchToProps = ({
  openDrawer,
  setDrawerContent,
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
