import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Button from '../../components/FormComponents/Button/Button';

import * as Paths from '../../enums/Paths';

import './IndexView.css';

class IndexView extends Component {

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  }

  static defaultProps = {
   
  }

  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.navigateToImages();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isAuthenticated) {
      this.navigateToImages();
    }
  }

  navigateToImages() {
    this.props.history.push(Paths.IMAGES);
  }

  getDayTimeMessage() {
    const hour = moment().hour();
    if (hour < 12) {
      return 'Good morning';
    } else if (hour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  }

  renderTitle() {
    return (
      <h1 className="title">
        {this.getDayTimeMessage()}.
        <div className="sub-title">And welcome to <span className="colored">{process.env.REACT_APP_NAME}</span></div>
      </h1>
    );
  }

  render() {
    const { history } = this.props;
    return (
      <div className="index">
        <section className="image-container">
         <div className="show-small">{this.renderTitle()}</div>
          <p>This application is using the machine learning based <span className="colored">AWS Rekognition</span> feature to detect labels and faces on any picture uploaded from this application.</p>
          <h1>Key features included</h1>
          <ul>
            <li>Label rekognition</li>
            <li>Face detection</li>
            <li>Face emotion analysis</li>
            <li>Face position evaluation</li>
          </ul>
          <section className="rekognition-example hide-small">
            <h1>Example</h1>
  
          </section>
        </section>
        <section className="sidebar-container">
          <div className="hide-small">{this.renderTitle()}</div>
          <div className="shadow-cover show-small" />
          <div className="action">
            <Link className="register" to={Paths.REGISTER}>Create account</Link>
            <Button
              onClick={() => history.push(Paths.LOGIN)}
            >Login</Button>
          </div>
        </section>
      </div>
    )
  }
}

export default IndexView;
