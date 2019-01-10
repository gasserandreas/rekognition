import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from 'grommet';

import { Colors } from '../../styles';

// label component
const onClickEnabled = label => label.instances.length > 0;

const handleLabelHover = (props) => props.isClickable
  ? `
    color: ${Colors.Blue.Default};
    border-color: ${Colors.Blue.Default};

    &:hover {
      cursor: pointer;
      background-color: ${Colors.Blue.Default};
      color: ${Colors.ColorsPalette.White};
    }
  `
  : '';

const StyledLabel = styled.div`
  border: 1.5px solid ${Colors.Neutrals.Mid};
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  display: inline-block
  font-size: 0.8rem;
  margin-left: 0.25rem;
  margin-bottom: 0.5rem;

  span {
    font-size: 0.75rem;
  }

  ${(props) => handleLabelHover(props)}
`;

const Label = (props) => {
  const { label, ...rest } = props;
  const { name, confidence } = label;

  const confidenceStr = String(confidence).substring(0,5);

  return (
    <StyledLabel
      isClickable={onClickEnabled(label)}
      {...rest}
    >
      {name} <span>({confidenceStr})</span>
    </StyledLabel>
  );
};

Label.propTypes = {
  label: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    confidence: PropTypes.number.isRequired,
    parents: PropTypes.arrayOf(PropTypes.string).isRequired,
    instances: PropTypes.arrayOf(PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      left: PropTypes.number.isRequired,
      top: PropTypes.number.isRequired,
    })).isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

// labels
const StyledLabels = styled(Box)`
`;

class Labels extends Component {
  onLabelClick = this.onLabelClick.bind(this);

  onLabelClick(label) {
    if (onClickEnabled(label)) {
      this.props.onLabelClick(label);
    }
  }

  render() {
    return (
      <StyledLabels
        wrap
        direction="row"
      >
        {this.props.labels.map((label) => (
          <Label
            key={`image_label_${label.id}`}
            label={label}
            onClick={() => this.onLabelClick(label)}
          />
        ))}
      </StyledLabels>  
    );
  }
}

Labels.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onLabelClick: PropTypes.func.isRequired,
};

export default Labels;
