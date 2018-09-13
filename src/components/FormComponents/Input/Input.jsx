import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import './Input.css';

const initialState = {
  id: uuid.v4(),
  active: false,
};

class Input extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    inputProps: PropTypes.shape({}),
    validation: PropTypes.shape({
      valid: PropTypes.bool,
      dirty: PropTypes.bool,
      errors: PropTypes.arrayOf(PropTypes.string),
    }),
    rules: PropTypes.arrayOf(PropTypes.func),
  }

  static defaultProps = {
    value: '',
    label: undefined,
    inputProps: {},
    validation: {
      valid: false,
      dirty: false,
      errors: [],
    },
    rules: [],
  }

  state = initialState;

  toggleActive = this.toggleActive.bind(this);
  onChangeInput = this.onChangeInput.bind(this);
  onBlurInput = this.onBlurInput.bind(this);

  componentWillMount() {
    const { value } = this.props;

    if (value.length > 0) {
      this.setState({ active: true });
    }
  }

  onChangeInput(e) {
    const { onChange, rules } = this.props;
    const { target: { value } } = e;

    const errors = rules
      .map(rule => rule(value))
      .filter(error => error !== null);

    const obj = {
      value,
      validation: {
        valid: errors.length === 0,
        dirty: true,
        errors,
      },
    };

    onChange && onChange(e, obj);
  }

  onBlurInput(e) {
    this.onChangeInput(e);

    // check for disable active
    const { target: { value } } = e;

    if(value.length === 0) {
      this.setState({ active: false });
    }
  }

  toggleActive() {
    const { active } = this.state;

    if (!active) {
      this.setState({ active: true });
    }
  }

  renderLabel() {
    const { id, active } = this.state;
    const { label } = this.props;

    if (!label) {
      return null;
    }

    return (
      <label
        htmlFor={id}
        onClick={this.toggleActive}
        className={active ? 'is-active' : ''}
      >{label}</label>
    );
  }

  renderInput() {
    const { id } = this.state;
    const { inputProps, type, value } = this.props;

    const inputCss = ['input', inputProps.className]
      .filter(item => item !== undefined);

    const props = {
      ...inputProps,
      type,
      className: inputCss.join(' '),
      id,
      value,
      onChange: this.onChangeInput,
      onBlur: this.onBlurInput,
      onClick: this.toggleActive,
      onFocus: this.toggleActive,
    };
    return <input {...props} />;
  }

  renderError() {
    const { validation: { errors }} = this.props;

    return (
      <div className="error-messages">
        <i className="fas fa-times" />
        {errors[0]}
      </div>
    );
  }

  render() {
    const { validation } = this.props;
    const { valid, dirty } = validation;

    const showError = !valid && dirty;

    const className = `input-wrapper${showError ? ' error' : ''}`;
    return (
      <div className={className}>
        {this.renderLabel()}
        {this.renderInput()}
        {showError && this.renderError()}
      </div>
    );
  }
}

export default Input;
