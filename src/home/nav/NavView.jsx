import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { css } from 'emotion';

import { 
  HeaderSection,
  ContainerHeader,
  ItemAvatar,
  MenuSection,
  Item,
  Separator,
} from '@atlaskit/navigation-next';

const Styles = {
  Header: css`
    padding-bottom: 20px;
  `,
}

const NavView = (props) => (
  <Fragment>
    <HeaderSection>
      {() => (
        <div className={Styles.Header}>
          <ContainerHeader
            before={(itemState) => (
              <ItemAvatar
                itemState={itemState}
                appearance="square"
                size="large"
              />)
            }
            text="Home"
            subText="Information"
          />
        </div>
      )}
    </HeaderSection>
    <MenuSection>
      {({ className }) => (
        <div className={className}>
          <Item text="Things in this container" />
          <Item text="Reports" />
          <Item text="Some other thing selected" isSelected />
          <Separator />
        </div>
      )}
    </MenuSection>
  </Fragment>
);

NavView.propTypes = {};

NavView.defaultProps = {};

export default NavView;
