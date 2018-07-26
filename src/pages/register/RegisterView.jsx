import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import InputGroup from '../../components/InputGroup/InputGroup';

import * as Paths from '../../routes/paths';

import './RegisterView.css';

const rules = {
  minLength: (l) => (v) => v.length <= l ? `Please specify more than ${l} chars` : undefined,
};

const initialState = {
  form: {},
  showValidation: false,
  valid: false,
};

class RegisterView extends Component {
  state = initialState;

  getValue = this.getValue.bind(this);
  getError = this.getError.bind(this);
  onInputChange = this.onInputChange.bind(this);
  onInputKeyDown = this.onInputKeyDown.bind(this);
  onRegisterButtonClick = this.onRegisterButtonClick.bind(this);

  componentWillMount() {
    if (this.props.user) {
      this.props.history.push(Paths.HOME);
    } else {
      this.initForm();
    }
  }

  initForm() {
    const form = ['firstname', 'lastname']
      .reduce((prev, cur) => ({
        ...prev,
        [cur]: {
          value: '',
          validation: {
            valid: false,
            error: [rules.minLength(3)('')],
          },
        },
      }), {});

      this.setState({ form });
  }

  validateForm(form) {
    return ['firstname', 'lastname']
      .map(key => form[key])
      .map((input) => {
        if (!input) {
          return false;
        }

        return input.validation.valid || false;
      })
      .reduce((prev, cur) => prev && cur, true);
  }

  getValue(key) {
    if (this.state.form[key]) {
      return this.state.form[key].value;
    }

    return '';
  }

  getError(key) {
    if (!this.state.showValidation) {
      return [];
    }

    const input = this.state.form[key];
    if (!input) {
      return [];
    }

    const { validation: { error }} = input;
    return error;
  }

  onInputChange(key) {
    return (obj) => {
      const { value, validation  } = obj;
      const { form } = this.state;

      const newForm = {
        ...form,
        [key]: {
          value,
          validation,
        },
      };

      const valid = this.validateForm(this.state.form);
      
      this.setState({
        form: newForm,
        valid,
      });
    };
  }

  onInputKeyDown(e) {
    const { which } = e;
    if (which === 13) {
      this.handleRegister();
    }
  }

  onRegisterButtonClick() {
    this.handleRegister();
  }

  handleRegister() {
    const valid = this.validateForm(this.state.form);

    this.setState({
      valid,
      showValidation: true,
    });

    if (valid) {
      const user = {
        firstname: this.getValue('firstname').trim(),
        lastname: this.getValue('lastname').trim(),
      };

      this.props.registerUser(user);

      // navigate to home
      this.props.history.push(Paths.HOME);
    }
  }

  render() {
    return (
      <div className="register-view">
        <div className="register-card">
          <h1 className="title">AWS Rekognition</h1>
          <p>
            Please fill in your name and lastname. This information is only stored in your in-browser memory and is not synchronized to server. <br />
            All communication and upload is made by anonymously by generated <code>hash-keys</code>.
          </p>
          <form>
            <InputGroup
              htmlFor="firstname"
              labelText="Enter your firstname"
              error={this.getError('firstname')}
            >
              <Input
                type="text"
                onChange={this.onInputChange('firstname')}
                onKeyDown={this.onInputKeyDown}
                placeholder="Steve"
                rules={[rules.minLength(2)]}
              />
            </InputGroup>
            <InputGroup
              htmlFor="lastname"
              labelText="Enter your lastname"
              error={this.getError('lastname')}
            >
              <Input
                type="text"
                onChange={this.onInputChange('lastname')}
                onKeyDown={this.onInputKeyDown}
                placeholder="Jobs"
                rules={[rules.minLength(2)]}
              />
            </InputGroup>
            <Button
              color="green"
              className="registration-button"
              onClick={this.onRegisterButtonClick}
            >Register User</Button>
          </form>
        </div>
      </div>
    );
  }
}

RegisterView.propTypes = {
  isAuthenticated: PropTypes.bool,
  registerUser: PropTypes.func.isRequired,
};

RegisterView.defaultProps = {
  user: false,
}

export default RegisterView;
