import React from 'react';
import PropTypes from 'prop-types';

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

Icon.propTypes = {
  enbled: PropTypes.bool,
  title: PropTypes.string,
  src: PropTypes.string,
  click: PropTypes.func
};

export default Icon;
