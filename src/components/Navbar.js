import React from 'react';
import PropTypes from 'prop-types';

const Navbar = props => {
  return <div className='navbar'>{props.children}</div>;
};

Navbar.propTypes = {
  children: PropTypes.array
};

export default Navbar;
