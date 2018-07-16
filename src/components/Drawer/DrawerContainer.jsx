import { connect } from 'react-redux';

import { closeDrawer } from '../../redux/drawer';

import Drawer from './Drawer';

const mapStateToProps = ({ drawer }) => {
  const { open, content } = drawer;
  return {
    open,
    // children,
    children: content,
  };
};

const mapDispatchToProps = ({
  onCloseClick: closeDrawer,
});

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
