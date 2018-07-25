import { connect} from 'react-redux';

import { setAuth } from '../../redux/auth';

import RegisterView from './RegisterView';

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = ({
  registerUser: setAuth,
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);
