import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as Paths from '../../enums/Paths';

import UserForm from '../../components/UserForm/UserForm';

import './LoginView.css';

const initialState = {
};

class LoginView extends Component {
  static propTypes = {
    user: PropTypes.shape({}),
    login: PropTypes.func.isRequired,
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
    const { firstname, lastname, id } = data;
    const user = { id, firstname, lastname };

    this.props.login(user);
  }

  render() {
    return (
      <div className="login-view view center-view">
        <div>
          <h1 className="title">Login</h1>
          <p>Reuse your old credentials or start fresh with new credentials and <Link to={Paths.REGISTER}>register here</Link>.</p>
        </div>
        <UserForm
          buttonLabel="Login"
          onSubmit={this.onFormSubmit}
          withId
        />
      </div>
    );
  }
}

export default LoginView;
