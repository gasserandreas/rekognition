import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from 'grommet';

import Label from './Label';

// labels
const StyledLabels = styled(Box)``;

const Labels = ({
  selectedLabel,
  labels,
  onLabelClick,
}) => {

  const handleOnLabelClick = (label) => {
    if (isClickEnabled(label)) {
      onLabelClick(label)
    }
  };

  const isClickEnabled = label => label.instances.length > 0;

  return (
    <StyledLabels
      wrap
      direction="row"
    >
      {labels.map((label) => {
        const labelProps = {
          key: `image_label_${label.id}`,
          label,
          onClick: () => handleOnLabelClick(label),
          isClickable: isClickEnabled(label),
          selected: selectedLabel && selectedLabel.id === label.id,
        };

        return <Label {...labelProps} />;
      })}
    </StyledLabels>
  );
};

Labels.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedLabel: PropTypes.shape({}),
  onLabelClick: PropTypes.func.isRequired,
};

Labels.defaultProps = {
  selectedLabel: {
    id: '',
  },
};

export default Labels;
