import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

import './Navigation.css';

class Navigation extends Component {
  static propTypes = {
    openDrawer: PropTypes.func.isRequired,
  };

  static defaultProps = {};
  render() {
    return (
      <nav>
        <a
          className="previous"
          onClick={() => this.props.openDrawer()}
          role="button"
          tabIndex="0"
        >Show previous</a>
        <div className="controls">
          <Button color="green" onClick={() => console.log('hello')}>Dummy Button</Button>
        </div>
      </nav>
    );
  }
};

export default Navigation;
