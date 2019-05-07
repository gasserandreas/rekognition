import React from 'react';
import * as ReactRouterDom from 'react-router-dom';

import { mount } from 'enzyme';

import PrivateRoute from '../PrivateRoute';

describe('PrivateRoute test suite', () => {
  let reactRouterDomRedirectMock;
  beforeAll(() => {
    // orgRedirect = Redirect
    reactRouterDomRedirectMock = jest.spyOn(ReactRouterDom, 'Redirect').mockImplementation(() => <p>redirect</p>);
  });

  afterAll(() => {
    reactRouterDomRedirectMock.resetMock();
  });

  const DummyComponent = () => <h1>Test Heading</h1>;

  const getPrivateRoute = props => mount(
    <ReactRouterDom.MemoryRouter>
      <PrivateRoute {...props} />
    </ReactRouterDom.MemoryRouter>,
  );

  const initialProps = {
    component: DummyComponent,
    isAuthenticated: true,
  };

  it('should render component if authenticated', () => {
    const wrapper = getPrivateRoute(initialProps);
    const component = mount(<DummyComponent />);
    expect(wrapper.html()).toEqual(component.html());
  });

  it('should render component if not authenticated', () => {
    const wrapper = getPrivateRoute({
      ...initialProps,
      isAuthenticated: false,
    });
    expect(wrapper.html()).toEqual('<p>redirect</p>');
  });
});
