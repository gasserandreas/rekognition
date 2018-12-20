/** @jsx jsx */
import { Component } from 'react';
import uuid from 'uuid';
import { Link } from 'react-router-dom';
import { jsx, css } from '@emotion/core';
import PropTypes from 'prop-types';

import { GlobalItem } from '@atlaskit/navigation-next';
import { JiraIcon } from '@atlaskit/logo';
import AddIcon from '@atlaskit/icon/glyph/add';
import EditorImageIcon from '@atlaskit/icon/glyph/editor/image';
import Avatar from '@atlaskit/avatar';

import * as Paths from '../paths';

import { MediaSize } from '../styles';

const Styles = {
  GlobalNavigation: css`
    align-items: center;
    box-sizing: border-box;
    display: flex;
    flex-shrink: 0;
    justify-content: space-between;
    transition: background-color 0.3s cubic-bezier(0.2,0,0,1),color 0.3s cubic-bezier(0.2,0,0,1);
    background-color: #0747A6;
    color: #FFFFFF;
    fill: #0747A6;

    padding: 6px 12px;

    @media (min-width: ${MediaSize.Tablet}) {
      padding: 24px 0px;
      height: 100vh;
      width: 64px;
      flex-direction: column;
    }
  `,
  NavItems: css`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    width: 50%;
    flex-direction: row;

    @media (min-width: ${MediaSize.Tablet}) {
      width: 100%;
      flex-direction: column;
    }
  `,
  PrimaryItems: css`
    @media (max-width: ${MediaSize.Tablet}) {
      justify-content: flex-start;
    }
    @media (min-width: ${MediaSize.Tablet}) {
      padding-bottom: 16px;
    }
  `,
  SecondaryItems: css`
    @media (min-width: ${MediaSize.Tablet}) {
      padding-top: 8px;
    }
    @media (max-width: ${MediaSize.Tablet}) {
      justify-content: flex-end;
    }
  `,
  AddItem: css`
    @media (max-width: ${MediaSize.Tablet}) {
      display: none;
      visibility: hidden;
    }
  `,
}

// navigation configuration
const primaryItems = (isAuthenticated) => {
  const base = [
    {
      icon: JiraIcon,
      id: 'home',
      path: Paths.HOME,
    },
  ];

  if (!isAuthenticated) {
    return base;
  }

  return [
    ...base,
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
      css: Styles.AddItem,
    },
  ];
};

const secondaryItems = (isAuthenticated) => {
  if (!isAuthenticated) {
    return [];
  }
  return [
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
};

export default class GlobalNav extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  }

  renderGlobalNavItems({
    id,
    path,
    onClick,
    css = {},
    name = '',
    ...props
  }) {
    const key = id || uuid.v4();

    // return simple GlobalItem if no path available
    if (!path) {
      const newProps = {
        id,
        onClick,
        ...props,
      };

      return (
        <span key={key} css={css}>
          <GlobalItem {...newProps} />
        </span>
      );
    }

    // Note: we do not allow to pass `onClick` to avoid multi action dispatch
    return (
      <Link to={path} key={key} css={css}>
        <GlobalItem {...props} />
      </Link>
    )
  }

  render() {
    const { isAuthenticated } = this.props;
    return (
      <div css={Styles.GlobalNavigation}>
        <div css={[Styles.NavItems, Styles.PrimaryItems]}>
          {primaryItems(isAuthenticated).map(item => this.renderGlobalNavItems(item))}
        </div>
        <div css={[Styles.NavItems, Styles.SecondaryItems]}>
          {secondaryItems(isAuthenticated).map(item => this.renderGlobalNavItems(item))}
        </div>
      </div>
    );
  }
};
