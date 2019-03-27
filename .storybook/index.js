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
