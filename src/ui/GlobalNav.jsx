import React, { Component } from 'react';
import uuid from 'uuid';
import { Link } from 'react-router-dom';

import { GlobalNav, GlobalItem } from '@atlaskit/navigation-next';
import { JiraIcon } from '@atlaskit/logo';
import AddIcon from '@atlaskit/icon/glyph/add';
import EditorImageIcon from '@atlaskit/icon/glyph/editor/image';
import Avatar from '@atlaskit/avatar';

import * as Paths from '../paths';

// navigation configuration
const primaryItems = [
  {
    icon: JiraIcon,
    id: 'home',
    path: Paths.HOME,
  },
  {
    icon: () => <EditorImageIcon size="large" />,
    id: 'images',
    path: Paths.IMAGES,
  },
  {
    icon: () => <AddIcon />,
    id: 'add',
    // TODO: add to redux later on
    onClick: () => console.log('add new image'),
  }
];
const secondaryItems = [
  {
    icon: () => (
      <Avatar
        borderColor="transparent"
        isActive={true}
        isHover={false}
        size="small"
      />
    ),
    size: 'small',
    path: Paths.USER,
    id: 'user',
  }
];

class GlobalNavigation extends Component {
  // override basic render method to support react-router-dom link comp
  renderGlobalNavItems({ id, path, onClick, ...props }) {
    const key = id || uuid.v4();

    // return simple GlobalItem if no path available
    if (!path) {
      const newProps = {
        id,
        key,
        onClick,
        ...props,
      };

      return (
        <GlobalItem {...newProps} />
      );
    }

    // Note: we do not allow to pass `onClick` to avoid multi action dispatch
    return (
      <Link to={path} key={key}>
        <GlobalItem {...props} />
      </Link>
    )
  }

  render() {
    return (
      <GlobalNav
        itemComponent={this.renderGlobalNavItems}
        primaryItems={primaryItems}
        secondaryItems={secondaryItems}
      />
    );
  }
}

export default GlobalNavigation;
