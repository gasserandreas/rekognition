import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import KeyValueList from '../../../components/KeyValueList/KeyValueList';

import './DataView.css';

class DataView extends Component {
  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    faceIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    faceById: PropTypes.shape({}).isRequired,
    selectFace: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  renderFace(face) {
    const { selectFace } = this.props

    if (!face) {
      return null;
    }
  
    const { id, tags } = face;
  
    return (
      <KeyValueList
        data={tags}
        onListClick={() => selectFace(id)}
      />
    )
  }

  render() {
    const { tags, faceIds, faceById } = this.props;
    return (
      <div className="data-view">
        <section className="tags">
          <h1>Tags</h1>
          <KeyValueList data={tags} />
        </section>
        <section className="faces">
          <h1>Faces</h1>
          {faceIds.map((id, i) => (
            <Fragment key={`face_${id}`}>
              {i > 0 && <hr className="divider" />}
              {this.renderFace(faceById[id])}
            </Fragment>
          ))}
        </section>
      </div>
    );
  }
}

export default DataView;
