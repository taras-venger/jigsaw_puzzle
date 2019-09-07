import React from 'react';
import Cell from './Cell';

const Frame = props => {
  const { imageWidth, imageHeight, rows, columns } = props;
  const cellWidth = imageWidth / columns;
  const cellHeight = imageHeight / rows;

  const style = {
    position: 'absolute',
    height: imageHeight,
    width: imageWidth,
    top: '50%',
    left: '50%',
    marginTop: -imageHeight / 2,
    marginLeft: -imageWidth / 2,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
    fontSize: 0
  };

  const fillFrame = () => {
    const cells = Array(rows * columns)
      .fill()
      .map((_, i) => (
        <Cell key={i} cellWidth={cellWidth} cellHeight={cellHeight} />
      ));
    return cells;
  };

  return (
    <div className='frame' style={style}>
      {fillFrame()}
    </div>
  );
};

export default Frame;