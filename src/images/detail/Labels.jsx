import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from 'grommet';

import Label from './Label';


// labels
const StyledLabels = styled(Box)`
`;

class Labels extends Component {
  onLabelClick = this.onLabelClick.bind(this);

  onClickEnabled(label) {
    return label.instances.length > 0;
  }

  onLabelClick(label) {
    if (this.onClickEnabled(label)) {
      this.props.onLabelClick(label);
    }
  }

  render() {
    return (
      <StyledLabels
        wrap
        direction="row"
      >
        {this.props.labels.map((label) => {
          const labelProps = {
            key: `image_label_${label.id}`,
            label,
            onClick: () => this.onLabelClick(label),
            isClickable: this.onClickEnabled(label),
          };

          return <Label {...labelProps} />;
        })}
      </StyledLabels>  
    );
  }
}

Labels.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onLabelClick: PropTypes.func.isRequired,
};

export default Labels;
