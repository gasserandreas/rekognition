import { connect } from 'react-redux';

import { openDrawer } from '../../redux/drawer';
import { addImage } from '../../redux/images';

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
  addImage,
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
