import React from 'react';
import { makeDecorator } from "@storybook/addons";

import { MemoryRouter } from 'react-router-dom';

export const withRouter = makeDecorator({
  name: 'withRouter',
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context, _) => {
    return <MemoryRouter>{getStory()}</MemoryRouter>
  },
});

export const withDefaultMargin = makeDecorator({
  name: 'withCustomMargin',
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, _, __) => {
    return <div style={{ marginTop: '2rem' }}>{getStory()}</div>
  },
});
