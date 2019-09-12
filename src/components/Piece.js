import React from 'react';
import PropTypes from 'prop-types';

const Piece = props => {
  const { id, height, width, url } = props;

  const randomX = 30 + Math.floor(Math.random() * (260 - width));
  const randomY = 30 + Math.floor(Math.random() * (620 - height));

  const style = {
    backgroundImage: `url(${url})`,
    position: 'absolute',
    height: height,
    width: width,
    top: randomY,
    left: Math.random() >= 0.5 && randomX,
    right: randomX,
    cursor: 'pointer',
    border: '1px solid black'
  };

  const dragStart = e => {
    const piece = e.target;
    e.dataTransfer.setData('pieceID', piece.id);
    e.dataTransfer.setData('offsetX', e.nativeEvent.offsetX);
    e.dataTransfer.setData('offsetY', e.nativeEvent.offsetY);
    setTimeout(() => (piece.hidden = true), 0);
  };

  const dragEnd = e => {
    e.target.hidden = false;
    props.checkGameOver();
  };

  const dragOver = e => e.stopPropagation();

  return (
    <div
      id={id}
      className='piece'
      draggable='true'
      style={style}
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      onDragOver={dragOver}
    />
  );
};

Piece.propTypes = {
  id: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
  url: PropTypes.string
};

export default Piece;
