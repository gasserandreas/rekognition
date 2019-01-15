import React from 'react';
import PropTypes from 'prop-types';

import Button from '../ui/form/Button';
import View from '../ui/View';

import * as Paths from '../paths';

const PlaygroundView = (props) => {
  const playgroundActions = [
    {
      method: props.requestNow,
      name: 'Request NOW',
    },
    {
      method: () => props.logInUser({
        email: 'andreas.safe@gmail.com',
        password: 'testtest',
        remember: true,
      }),
      name: 'Login User',
    },
    {
      method: () => props.logOutUser(),
      name: 'Logout User',
    },
    {
      method: () => props.getUserInfo('64511a6f-fc7c-41fc-bd81-ab3019137404'),
      name: 'User Info',
    },
    {
      method: () => props.history.push(Paths.LOGIN),
      name: 'Navigate to login',
    },
  ]

  return (
    <View>
      <h1>Playground Page</h1>
      {playgroundActions.map((item, i) => (
        <div key={`item_${i}`}>
          <p><strong>{item.name}</strong></p>
          <Button onClick={item.method}>Execute action</Button>
        </div>
      ))}
    </View>
  );
};

PlaygroundView.propTypes = {
  user: PropTypes.shape({}),
};

PlaygroundView.defaultProps = {
  user: null,
};

export default PlaygroundView;
