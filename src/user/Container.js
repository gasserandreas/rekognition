import { connect } from 'react-redux';

import UserView from './UserView';

const select = state => ({
  user: {
    firstname: '',
    lastname: '',
    email: '',
  },
});

const mapDispatchToProps = ({
  updateUser: (obj) => {
    console.log('updateUser');
    console.log(obj);
  }
});

export default connect(select, mapDispatchToProps)(UserView);
