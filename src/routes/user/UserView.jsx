import React, { Component } from 'react';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';

import UserForm from '../../components/UserForm/UserForm';
import Input from '../../components/FormComponents/Input/Input';

import './UserView.css';

const initialState = {
};

class UserView extends Component {
  static propTypes = {
    user: PropTypes.shape({}),
    updateUser: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  };

  static defaultProps = {
    user: null,
    updateUser: () => ({}),
    logout: () => ({}),
  };

  timeout = null;

  state = initialState;

  onFormSubmit = this.onFormSubmit.bind(this);
  onClickLogout = this.onClickLogout.bind(this);
  onCopyToClipboard = this.onCopyToClipboard.bind(this);

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  onFormSubmit(data) {
    const { firstname, lastname } = data;
    const user = { firstname, lastname };

    this.props.updateUser(user);
  }

  onClickLogout() {
    const confirm = window.confirm('Have you saved your credential key? \nAfter logout you won\'t have access to your data without your private credential key.');
    if (confirm) {
      this.props.logout();
    }
  }

  onCopyToClipboard() {
    const { user: { id } } = this.props;
    if(!copy(id)) {
      console.log('Could not copy to clipboard')
    } else {
      this.setCopiedToClipboard();
    };
  }

  setCopiedToClipboard() {
    this.setState({
      copiedToClipboard: true,
    });

    this.timeout = setTimeout(() => this.setState({ copiedToClipboard: false }), 3000);
  }

  render() {
    const { copiedToClipboard } = this.state;
    const { user } = this.props;
    const { id, firstname, lastname } = user;

    const formData = {
      firstname,
      lastname,
    };

    return (
      <div className="center-view user-view view">
        <div>
          <h1 className="title">User detail</h1>
          <p>Check your user settings and credentials <br />
          Would you like to logout and clear all local information, please <a onClick={this.onClickLogout} className="logout">click here</a>.</p>
          <div className="user-credentials">
            <h3>Profile identifier</h3>
            <Input
              label="User key"
              type="text"
              onChange={() => ({})}
              value={id}
              inputProps={{
                disabled: true,
                className: 'user-key'
              }}
            />
            <a className="copy-to-clipboard" onClick={this.onCopyToClipboard}>Copy to clipboard</a>
            {copiedToClipboard && <span className="copied"> [copied]</span>}
          </div>
          <UserForm
            data={formData}
            buttonLabel="Update user"
            cancelLabel="Go back"
            onClickCancel={() => this.props.history.goBack()}
            onSubmit={this.onFormSubmit}
          />
        </div>
      </div>
    );
  }
}

export default UserView;
