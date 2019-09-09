import React from 'react';

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

export default Slider;
