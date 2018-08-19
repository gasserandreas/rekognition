import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import PropertyList from '../../../components/PropertyList/PropertyList';

import './DataView.css';

class DataView extends Component {
  static propTypes = {
    labels: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    faceIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    faceById: PropTypes.shape({}).isRequired,
    selectFace: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  renderFace(face, onClick) {
    if (!face) {
      return null;
    }
    const { id, properties } = face;
  
    const tags = Object.keys(properties).map((key) => {
      const value = properties[key];
      return {
        key,
        value,
      };
    });

    console.log(tags);

    return (
      <PropertyList
        data={properties}
        dispatchOnClick={() => onClick(id)}
        excludedKeys={['pose', 'landmarks', 'boundingBox']}
      />
    );
  }

  render() {
    const { labels, faceIds, faceById, selectFace } = this.props;
    console.log(this.props);

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
            <Fragment key={`face_${id}`}>
              {i > 0 && <hr className="divider" />}
              <div className="face-name">{faceById[id].name}</div>
              {this.renderFace(faceById[id], selectFace)}
            </Fragment>
          ))}
        </section>
      </div>
    );
  }
}

export default DataView;
