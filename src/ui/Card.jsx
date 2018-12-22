/** @jsx jsx */
import PropTypes from 'prop-types';
import { jsx, css } from '@emotion/core';

import { Colors } from '../styles';

const Styles = {
  Card: css`
    background-color: ${Colors.White.default};
    padding: 3rem 2rem;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 10px;
    box-sizing: border-box;
  `,
};

const Card = (props) => (
  <div css={Styles.Card}>
    {props.children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;
