import React from 'react';

const Icon = props => {
  return (
    <img
      className={props.enabled ? 'icon' : 'icon_disabled'}
      title={props.title}
      src={props.src}
      alt=''
      onClick={props.click}
      onDragStart={e => e.preventDefault()}
    />
  );
};

export default Icon;
