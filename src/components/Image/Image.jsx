import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import './Image.css';

const initialState = {
  src: undefined,
  loading: false,
  loadingId: undefined,
  dimension: {
    width: 0,
    heigth: 0,
  },
};

class Image extends Component {
  state = initialState;

  onImageLoad = this.onImageLoad.bind(this);

  static propTypes = {
    src: PropTypes.string,
    href: PropTypes.string,
  }

  static defaultProps = {
    src: undefined,
    href: undefined,
  }

  componentWillMount() {
    const { src, href } = this.props;

    if (src) {
      this.setImage(src);
    } else if (href) {
      this.loadImage(href);
    }
  }

  componentWillReceiveProps(newProps) {
    const { src, href } = newProps;

    if (src !== this.props.src) {
      this.setImage(src);
    } else if (href !== this.props.href) {
      this.loadImage(href);
    }
  }

  setImage(props) {
    const { src } = props;

    this.setState({
      ...initialState,
      src,
    });
  }

  async loadImage(url) {
    const loadingId = uuid.v4();
    this.setState({
      ...initialState,
      loading: true,
      loadingId,
    });

    const config = {
      method: 'GET',
      mode: 'cors',
      cache: 'default'
    };

    try {
      const response = await fetch(url, config);
      const blob = await response.blob();
      const imageString = URL.createObjectURL(blob);

      this.setState({
        src: imageString,
        loading: false,
        error: undefined,
      });
    } catch (e) {
      console.log('Could not load image!');
      console.log(e);
      this.setState({
        loading: false,
        error: e,
      });
    }
  }

  onImageLoad({target: img}) {
    this.setState({
      dimension: {
        width: img.naturalWidth > img.naturalHeight ? '100%' : 'auto',
        height: img.naturalWidth > img.naturalHeight ? 'auto' : '100%',
      },
    })
  }

  renderImage() {
    const { src, loading, dimension } = this.state;

    const style = { ...dimension };

    const imageProps = {
      alt: '',
      ...this.props,
      src,
      onLoad: this.onImageLoad,
    };

    if (loading) {
      return <span>LoAdInG</span>;
    }

    if (!src) {
      return null;
    }

    return (
      <img style={style} {...imageProps} /> // eslint-disable-line jsx-a11y/alt-text
    )
  } 

  render() {
    
    return (
      <div className="image">
        {this.renderImage()}
      </div>
    );
  }
}

export default Image;
