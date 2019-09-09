import React from 'react';
import PropTypes from 'prop-types';

const Slider = props => {
  return (
    <div className='slider'>
      <p>
        {props.title}: {props.defaultValue}
      </p>
      <input
        type='range'
        title={props.title}
        onInput={props.getValue}
        defaultValue={props.defaultValue}
        min='2'
        max='10'
        step='1'
      />
    </div>
  );
};

Slider.propTypes = {
  title: PropTypes.string,
  getValue: PropTypes.func,
  defaultValue: PropTypes.number
};

export default Slider;
