import React from 'react';

const Image = props => {
  const { imageWidth, imageHeight } = props;

  const style = {
    position: 'absolute',
    height: imageHeight,
    width: imageWidth,
    top: '50%',
    left: '50%',
    marginTop: -imageHeight / 2,
    marginLeft: -imageWidth / 2
  };

  return (
    <div className='image' style={style}>
      <img src={props.url} alt='' hidden={props.hideImage} />
    </div>
  );
};

export default Image;
