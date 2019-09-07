import React from 'react';

const Backdrop = props => (
  <div className='backdrop' onClick={props.click}>
    {props.children}
  </div>
);

export default Backdrop;
