import { connect } from 'react-redux';

import ImageList from './ImageList';

import { getUserId } from '../../../common/sessionUtils';
import { getUrl } from '../../../common/services/networkUtils';

import { selectImages } from '../../../redux/selectors/images';

const select = state => ({
  images: selectImages(state),
  // imageBaseUrl: `${getUrl('image-thumb')}/${getUserId()}/`,
  imageBaseUrl: `${getUrl('image-full')}/${getUserId()}/`,
});

const mapDispatchToProps = ({})

export default connect(select, mapDispatchToProps)(ImageList);
