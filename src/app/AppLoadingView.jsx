import React from 'react';
import styled from 'styled-components';

import LoadingIndicator from '../ui/async/LoadingIndicator';
import View from '../ui/View';

import { Colors } from '../styles';

const StyledContainer = styled(View)`
  text-align: center;
  color: ${Colors.ColorsPalette.TextFaded};
`;

const AppLoadingView = props => (
  <View {...props}>
    <StyledContainer>
      <h3>Please stay tuned, app is loading.</h3>
      <LoadingIndicator size={120} />
    </StyledContainer>
  </View>
);

export const __testables__ = {
  StyledContainer,
};

export default AppLoadingView;
