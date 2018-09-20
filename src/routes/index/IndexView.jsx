import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Button from '../../components/FormComponents/Button/Button';

import * as Paths from '../../enums/Paths';

import landing_image from './landing_image.png';
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
          <div>
          <div className="show-small">{this.renderTitle()}</div>
            <p>Analyse image the way you've never done before. Using machine learned base <span className="colored">AWS Rekognition</span> features to detect labels and faces on any uploaded picture. Detect hidden emotions or faces on picture by using the massive compute capacity offered by the Amazon Cloud environment.</p>
            <img alt="example-analysis" src={landing_image} />
          </div>
          <div className="key-feature">
            <h1>Key Features</h1>
            <ul>
              <li>
                <i className="fas fa-tags" />Label / tags rekognition
              </li>
              <li>
                <i className="fas fa-smile" />
                Face detection
              </li>
              <li>
                <i className="fas fa-sad-cry" />
                Face emotion analysis
              </li>
            </ul>
          </div>
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
