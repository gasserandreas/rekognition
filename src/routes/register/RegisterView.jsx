import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as Paths from '../../enums/Paths';

import UserForm from '../../components/UserForm/UserForm';

import './RegisterView.css';

const initialState = {
};

class RegisterView extends Component {
  static propTypes = {
    user: PropTypes.shape({}),
    register: PropTypes.func.isRequired,
  };

  static defaultProps = {
    user: null,
  };

  state = initialState;

  onFormSubmit = this.onFormSubmit.bind(this);

  componentWillMount() {
    this.checkUser(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.checkUser(newProps);
  }

  checkUser({ user, history }) {
    if (user) {
      // redirect to index
      history.push(Paths.IMAGES);
    }
  }

  onFormSubmit(data) {
    const { firstname, lastname } = data;
    const user = { firstname, lastname };

    this.props.register(user);
  }

  render() {
    return (
      <div className="center-view registration-view view">
        <div>
          <h1 className="title">Register</h1>
          <p>You have to create an account to use the app or&nbsp;
            <Link to={Paths.LOGIN}>reuse already created credentials</Link>.</p>
        </div>
        <UserForm
          buttonLabel="Create account"
          onSubmit={this.onFormSubmit}
        />
      </div>
    );
  }
}

export default RegisterView;
