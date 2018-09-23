import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './AppLoadingBar.css';

const animationTime = 1550;

class AppLoadingBar extends Component {
  state = {
    show: false,
  };

  timer = null;

  componentWillMount() {
    const { working } = this.props;

    if (working) {
      this.startAnimation(this.props);
    }
  }

  componentWillUnmount() {
    this.endAnimation();
  }

  componentWillReceiveProps(newProps) {
    const { working } = newProps;
    const { show } = this.state;

    if (!show && working) {
      this.startAnimation(newProps);
    }
  }

  startAnimation(props) {
    this.setState({ show: props.working });

    // start periodic props checker and disable animation if needed
    this.timer = setInterval(() => {
      const { working } = this.props;
      const { show } = this.state;

      if (working !== show) {
        this.setState({ show: working });
      }
    }, animationTime);
  }

  endAnimation() {
    // proper cleanup
    clearInterval(this.timer);
  }

  render() {
    const { show } = this.state;
    return (
      <div className="app-loader">
        <div className={`loading-bar-wrapper${show ? ' working' : ''}`}>
          <div className="loading-bar" />
        </div>
      </div>
    );
  }
}

AppLoadingBar.propTypes = {
  working: PropTypes.bool.isRequired,
};

export default AppLoadingBar;
