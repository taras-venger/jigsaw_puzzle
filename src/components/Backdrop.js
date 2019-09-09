import React from 'react';
import PropTypes from 'prop-types';

const Backdrop = props => (
  <div className='backdrop' onClick={props.click}>
    {props.children}
  </div>
);

Backdrop.propTypes = {
  click: PropTypes.func,
  children: PropTypes.element
};

export default Backdrop;
