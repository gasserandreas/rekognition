import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import './Image.css';

const initialState = {
  loaded: false,
  image: null,
  // network information
  fetchNumber: 1,
  fetchId: null,
  isFetching: false,
  error: null,
}

class Image extends Component {
  static propTypes = {
    href: PropTypes.string.isRequired,
    className: PropTypes.string,
    imgProps: PropTypes.shape({}),
    maxFetchTry: PropTypes.number,
    interval: PropTypes.number,
    fetchOptions: PropTypes.shape({}),
    loadingMessage: PropTypes.string,
    onLoad: PropTypes.func,
    withDiv: PropTypes.bool,
  };

  static defaultProps = {
    className: undefined,
    imgProps: {},
    maxFetchTry: 5,
    interval: 7500,
    fetchOptions: {},
    loadingMessage: undefined,
    withDiv: false,
    onLoad: () => ({}),
  };

  state = initialState;
  interval = null;
  imgRef = null;

  // flag to validate setState method on fetch calls
  mounted = true;

  fetchImage = this.fetchImage.bind(this);
  tryFetchImage = this.tryFetchImage.bind(this);
  onImageLoad = this.onImageLoad.bind(this);

  componentWillMount() {
    this.prepareFetchImage(this.props.href);
  }

  componentWillReceiveProps(newProps) {
    const { href } = newProps;
    if (this.props.href !== href) {
      this.setState(initialState, () => {
        this.prepareFetchImage(href);
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;

    clearInterval(this.interval);

    // destroy fetchId to avoid setState calls on unMounted components
    this.setState({
      fetchId: null,
    });
  }

  customSetState(state, callback) {
    if (this.mounted) {
      this.setState({ ...state }, callback);
    }
  }

  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
  
    bytes.forEach((b) => binary += String.fromCharCode(b));
  
    return window.btoa(binary);
  };

  prepareFetchImage(href) {
    const fetchId = uuid.v4();
    this.setState({
      fetchId,
    }, () => {
      this.tryFetchImage(href, fetchId);
    })
  }

  tryFetchImage(href, fetchId) {
    // clear interval first
    clearInterval(this.interval);

    this.customSetState({
      loaded: false,
      isFetching: true,
      image: null,
      fetchNumber: this.state.fetchNumber + 1,
      fetchId,
    }, () => {
      this.fetchImage(href, fetchId);
    });
  }

  fetchImage(href, fetchId) {
    const { fetchOptions, maxFetchTry, onLoad, withDiv } = this.props;

    // fetch image
    const config = {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
      ...fetchOptions,
    }
    fetch(href, config)
      .catch(() => Promise.reject('Network error'))
      .then((response) => {
        const { ok, status } = response;
        if (!ok || status !== 200) {
          return Promise.reject(`Could not load image: ${response.status}`);
        } else {
          return Promise.resolve(response.arrayBuffer());
        }
      })
      .then((buffer) => {
        // only callback if the same request id
        if (this.state.fetchId === fetchId) {

          // create image from response
          const base64Flag = 'data:image/jpeg;base64,';
          const imageStr = this.arrayBufferToBase64(buffer);
          const image = `${base64Flag}${imageStr}`;

          this.customSetState({
            loaded: true,
            image,
            error: null,
            isFetching: false,
          });

          // callback if render as div
          withDiv && onLoad(image);
        }
      })
      .catch((error) => {
        if (this.state.fetchNumber === maxFetchTry) {
          this.customSetState({
            loaded: false,
            image: null,
            error: new Error(error),
            isFetching: false,
          });

          return true;
        }

        this.interval = setInterval(
          () => this.tryFetchImage(href),
          this.props.interval
        );
      });
  }

  onImageLoad(image) {
    const { onLoad } = this.props;
    onLoad(image);
  }

  renderWithDiv() {
    const { image, loaded } = this.state;
    const style = loaded ? {
      backgroundImage: loaded ? `url(${image})` : 'inherit',
      width: '100%',
      height: '100%',
    } : {
      display: 'none',
    };

    return <div style={style} />
  }

  renderWithImg() {
    const { image, loaded } = this.state;
    const src = loaded ? image : 'inherit';
    return (
      <img
        src={src}
        alt=""
        onLoad={() => this.onImageLoad(this.imgRef)}
        ref={(tag) => this.imgRef = tag ? tag : null }
      />
    );
  }

  render() {
    const { loaded, error } = this.state;
    const { onClick, style, imgProps, loadingMessage, withDiv } = this.props;

    const newProps = {
      ...imgProps,
      onClick,
      style,
      className: `image ${this.props.className || ''}`,
    }

    let content = null;
    if (error) {
      content = <p className="error">{error.message}</p>;
    } else if (!loaded) {
      content = <p className="loading">{loadingMessage || 'Fetching image'}</p>;
    }

    return (
      <div {...newProps}>
        { withDiv ? this.renderWithDiv() : this.renderWithImg()}
        {content}
      </div>
    )
  }
}

export default Image;
