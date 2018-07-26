import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Input.css';

const initialState = {
  value: '',
  validation: {
    valid: null,
    error: [],
  },
}

class Input extends Component {
  state = initialState;

  onChange = this.onChange.bind(this);

  componentWillMount() {
    const { value, rules } = this.props;
    this.setState({
      value,
      validation: {
        ...this.validate(value, rules),
      },
    });
  }

  componentWillReceiveProps(newProps) {
    const { value, rules } = newProps;
    if (value !== this.props.value) {
      this.setState({
        ...initialState,
        value,
        validation: {
          ...this.validate(value, rules),
        },
      });
    }
  }

  validate(value, rules) {
    const error = rules
      .map((rule) => rule(value || ''))
      .filter(v => {
        return v !== undefined;
      });
    
    return {
      valid: error.length === 0,
      error,
    };
  }

  onChange(e) {
    const { target: { value }} = e;
    const { onChange, rules } = this.props;

    const validation = this.validate(value, rules);

    this.setState({
      value,
      validation,
    });

    onChange({
      value,
      validation,
      event: e,
    });
  }

  render() {
    const { className } = this.props;

    const newClassName = `input ${className ? className : ''}`;
    const newProps = {
      type: "text",
      ...this.props,
      className: newClassName,
    };

    return (
      <input
        {...newProps}
        onChange={this.onChange}
      />
    );
  }
}

Input.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  rules: PropTypes.arrayOf(PropTypes.func),
};

Input.defaultProps = {
  value: undefined,
  onChange: () => ({}),
  rules: [],
};

export default Input;
