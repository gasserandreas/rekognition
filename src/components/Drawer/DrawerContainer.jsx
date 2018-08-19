import { connect } from 'react-redux';

import { selectImagesIds, selectImagesById } from '../../selectors/images';
import { selectDrawerOpen } from '../../selectors/drawer';
import { selectAuthKey } from '../../selectors/auth';

import { closeDrawer } from '../../redux/drawer';
import { selectImageIds } from '../../redux/images';

import Drawer from './Drawer';

const select = state => ({
  imageBase: selectAuthKey(state),
  open: selectDrawerOpen(state),
  imageIds: selectImagesIds(state),
  imageById: selectImagesById(state),
})

const mapDispatchToProps = ({
  onCloseClick: closeDrawer,
});

export default connect(select, mapDispatchToProps)(Drawer);
