import { connect} from 'react-redux';

import { setAuth } from '../../redux/auth';

import RegisterView from './RegisterView';

const mapStateToProps = (state) => {
  const { auth } = state;
  const { isAuthenticated } = auth;

  return {
    isAuthenticated,
  };
};

const mapDispatchToProps = ({
  registerUser: setAuth,
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);
