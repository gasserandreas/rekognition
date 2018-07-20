import React, { Component } from 'react';

import './Image.css';

const initialState = {
  loading: true,
};

class Image extends Component {
  state = initialState;

  imageOnLoad = this.imageOnLoad.bind(this);

  imageOnLoad(obj) {
    this.setState({ loading: false });

    if (this.props.onLoad) {
      this.props.onLoad(obj);
    }
  }

  render() {
    const { loading } = this.state;
    const style = { opacity: loading ? 0 : 1 };
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
