import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

import './Navigation.css';

const drawerContent = (
  <Fragment>
    <h1>Drawer Content</h1>
    <p>Test TEs test</p>
  </Fragment>
);

// const Navigation = ({ drawer, openDrawer }) => {
class Navigation extends Component {
  static propTypes = {
    openDrawer: PropTypes.func.isRequired,
    setDrawerContent: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  componentWillMount() {
    console.log(this.props);
    this.props.setDrawerContent(drawerContent);
  }

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

// Navigation.propTypes = {
//   openDrawer: PropTypes.func.isRequired,
//   setDrawerContent: PropTypes.func.isRequired,
// };

// Navigation.defaultProps = {

// };

export default Navigation;
