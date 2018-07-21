import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Image.css';

const initialState = {
  loading: true,
};

class Image extends Component {
  state = initialState;

  imageOnLoad = this.imageOnLoad.bind(this);

  static propTypes = {
    className: PropTypes.string.isRequired,
  }

  static defaultProps = {
    className: '',
  }

  imageOnLoad(obj) {
    this.setState({ loading: false });

    if (this.props.onLoad) {
      this.props.onLoad(obj);
    }
  }

  render() {
    const { loading } = this.state;

    const style = {
      opacity: loading ? 0 : 1,
      display: 'block'
    };

    return (
      <div className="image-wrapper">
        {loading ? 'LOADING IMAGE' : ''}
        <img
          {...this.props}
          style={style}
          onLoad={this.imageOnLoad}
          alt=""
        />
      </div>
    );
  }
}

export default Image;
