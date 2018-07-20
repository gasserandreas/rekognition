import { connect } from 'react-redux';

import { closeDrawer } from '../../redux/drawer';

import Drawer from './Drawer';

const mapStateToProps = ({ drawer }) => {
  const { open } = drawer;
  return {
    open,
    pictureIds: ['picture_1.jpg', 'picture_2.jpg', 'picture_3.jpg'],
  };
};

const mapDispatchToProps = ({
  onCloseClick: closeDrawer,
});

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
