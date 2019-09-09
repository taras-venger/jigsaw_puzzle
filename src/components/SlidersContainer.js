import React from 'react';
import PropTypes from 'prop-types';

const SlidersContainer = props => (
  <div className='sliders_container'>{props.children}</div>
);

SlidersContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element)
};

export default SlidersContainer;
