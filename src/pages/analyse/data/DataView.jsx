import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PropertyList from '../../../components/PropertyList/PropertyList';

import './DataView.css';

class DataView extends Component {
  static propTypes = {
    labels: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    faceIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    faceById: PropTypes.shape({}).isRequired,
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

  render() {
    const { labels, faceIds, faceById, selectFace, selectedFaceId } = this.props;

    const properties = labels.reduce((prev, cur) => {
      const { key, value } = cur;
      return {
        ...prev,
        [key]: value,
      };
    }, {});

    return (
      <div className="data-view">
        <section className="tags">
          <h1>Tags</h1>
          <PropertyList
            data={properties}
          />
        </section>
        <section className="faces">
          <h1>Faces</h1>
          {faceIds.map((id, i) => (
            // <Fragment key={`face_${id}`}>
            <div
              key={`face_item_${id}`}
              className={`face-item ${id === selectedFaceId ? 'selected' : ''}`}
            >
              {i > 0 && <hr className="divider" />}
              <div className="face-name">{faceById[id].name}</div>
                {this.renderFace(faceById[id], selectFace)}
            </div>
            // </Fragment>
          ))}
        </section>
      </div>
    );
  }
}

export default DataView;
