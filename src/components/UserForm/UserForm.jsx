import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from '../FormComponents/Input/Input';
import Button from '../FormComponents/Button/Button';

import './UserForm.css';

// validation rules
const minLength = min => (value, name) => {
  const msg = `Enter your ${name} (min ${min} letters)`;

  if (!value) {
    return msg;
  }

  if (value.length < min) {
    return msg;
  }

  return null;
}

const Form = {
  FIRSTNAME: 'firstname',
  LASTNAME: 'lastname',
  ID: 'id',
};

const initialState = {
  valid: false,
  dirty: false,
  form: {},
}

class UserForm extends Component {
  static propTypes = {
    data: PropTypes.shape({}),
    onSubmit: PropTypes.func.isRequired,
    buttonLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    withId: PropTypes.bool,
    onClickCancel: PropTypes.func,
  }
  
  static defaultProps = {
    data: {},
    buttonLabel: 'Submit',
    cancelLabel: undefined,
    withId: false,
    onClickCancel: () => ({}),
  }

  state = initialState;

  onInputChange = this.onInputChange.bind(this);
  onCLickRegistrationButton = this.onCLickRegistrationButton.bind(this);

  componentWillMount() {
    const { data } = this.props;

    this.generateForm(data);
  }

  generateForm(initialData) {
    const { withId } = this.props;
    const form = Object.values(Form)
      .filter((key) => {
        if (withId) {
          return true;
        }

        return key !== 'id';
      })
      .map((key) => {
        const value = initialData[key];
        return {
          key,
          obj: {
            validation: {
              dirty: false,
              valid: value ? true : false,
              errors: [],
            },
            value,
          },
        };
      })
      .reduce((prev, cur) => ({
        ...prev,
        [cur.key]: cur.obj,
      }), {});

    this.setState({ form });
  }

  getFormState(key) {
    return this.state.form[key] || null;
  }

  getFormValue(key) {
    const data = this.getFormState(key);
    return data ? data.value : '';
  }

  getFormValidation(key) {
    const data = this.getFormState(key);
    return data ? data.validation : undefined;
  }

  onInputChange(key) {
    const { withId } = this.props;
    return (e, obj) => {

      // get state validation
      const stateValidation = Object.values(Form)
        .filter((key) => {
          if (withId) {
            return true;
          }
          return key !== 'id';
        })
        .filter(validationKey => validationKey !== key)
        .map((validationKey) => {
          const validation = this.getFormValidation(validationKey);
          
          return {
            key: validationKey,
            valid: validation ? validation.valid : false,
          };
        });
      
      // add new validation
      const validation = [ ...stateValidation, { key, valid: obj.validation.valid }];
      const valid = validation.reduce((prev, cur) => prev && cur.valid, true);

      this.setState({
        dirty: true,
        valid,
        form: {
          ...this.state.form,
          [key]: {...obj},
        },
      });
    }
  }

  onCLickRegistrationButton() {
    if (!this.state.valid) {
      return;
    }

    const data = Object.values(Form).map((key) => ({
        value: this.getFormValue(key),
        key,
      }))
      .reduce((prev, cur) => ({
        ...prev,
        [cur.key]: cur.value,
      }), {});
    
    this.props.onSubmit(data);
  }

  render() {
    const { cancelLabel, onClickCancel, withId } = this.props;
    return (
      <form className="user-form">
        <h3>Personal Information</h3>
          {withId && (
            <Input
              label="Your ID"
              type="text"
              onChange={this.onInputChange(Form.ID)}
              value={this.getFormValue(Form.ID)}
              validation={this.getFormValidation(Form.ID)}
              rules={[minLength(36)]}
            />
          )}
          <Input
            label="First name"
            type="text"
            onChange={this.onInputChange(Form.FIRSTNAME)}
            value={this.getFormValue(Form.FIRSTNAME)}
            validation={this.getFormValidation(Form.FIRSTNAME)}
            rules={[minLength(3)]}
          />
          <Input
            label="Last name"
            type="text"
            onChange={this.onInputChange(Form.LASTNAME)}
            value={this.getFormValue(Form.LASTNAME)}
            validation={this.getFormValidation(Form.LASTNAME)}
            rules={[minLength(3)]}
          />
          <div className="controls">
            <Button
              onClick={this.onCLickRegistrationButton}
              className="create-account"
              disabled={!this.state.valid}
              filled
            >{this.props.buttonLabel}</Button>
            { cancelLabel && (
              <a
                onClick={onClickCancel}
                className="cancel"
                to={'www.google.com'}
              >{cancelLabel}</a>
            )}
          </div>
      </form>
    );
  }
}

export default UserForm;
