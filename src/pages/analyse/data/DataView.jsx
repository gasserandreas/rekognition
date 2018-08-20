import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import PropertyList from '../../../components/PropertyList/PropertyList';

import './DataView.css';

class DataView extends Component {
  static propTypes = {
    labels: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    faceIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    faceById: PropTypes.shape({}).isRequired,
    loading: PropTypes.bool.isRequired,
    selectedFaceId: PropTypes.string,
    selectFace: PropTypes.func.isRequired,
  };

  static defaultProps = {
    selectedFaceId: undefined,
  };

  renderFace(face, onClick) {
    if (!face) {
      return null;
    }
    const { id, properties } = face;

    return (
      <PropertyList
        data={properties}
        dispatchOnClick={() => onClick(id)}
        excludedKeys={['pose', 'landmarks', 'boundingBox']}
      />
    );
  }

  renderLabels() {
    const { labels, loading } = this.props;

    const properties = labels.reduce((prev, cur) => {
      const { key, value } = cur;
      return {
        ...prev,
        [key]: value,
      };
    }, {});

    if (loading) {
      return <p>Analysing labels</p>;
    }

    if (labels.length === 0) {
      return <p>No labels to show</p>;
    }

    return (
      <PropertyList
        data={properties}
      />
    );
  }

  renderFaces() {
    const { selectedFaceId, faceById, faceIds, selectFace, loading } = this.props;

    if (loading) {
      return <p className="custom-padding">Analysing faces</p>;
    }

    if (faceIds.length === 0) {
      return <p className="custom-padding">No faces to show</p>;
    }

    return faceIds.map((id, i) => (
      <div
        key={`face_item_${id}`}
        className={`face-item ${id === selectedFaceId ? 'selected' : ''}`}
      >
        {i > 0 && <hr className="divider" />}
        <div className="face-name">{faceById[id].name}</div>
          {this.renderFace(faceById[id], selectFace)}
      </div>
    ));
  }

  render() {
    return (
      <div className="data-view">
        <section className="tags">
          <h1>Labels</h1>
          {this.renderLabels()}
        </section>
        <section className="faces">
          <h1>Faces</h1>
          {this.renderFaces()}
        </section>
      </div>
    );
  }
}

export default DataView;
