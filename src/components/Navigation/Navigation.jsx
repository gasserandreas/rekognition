import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

import './Navigation.css';

const Navigation = () => {

  return (
    <nav>
      <a className="previous">Show previous</a>
      <div className="controls">
        <Button color="green" onClick={() => console.log('hello')}>Dummy Button</Button>
      </div>
    </nav>
  );
};

Navigation.propTypes = {

};

Navigation.defaultProps = {

};

export default Navigation;
