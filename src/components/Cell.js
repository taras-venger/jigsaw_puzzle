import React from 'react';
import PropTypes from 'prop-types';

const Cell = props => {
  const {
    dataID,
    cellWidth,
    cellHeight,
    incrementCounter,
    checkGameOver
  } = props;

  const style = {
    boxSizing: 'border-box',
    display: 'inline-block',
    width: cellWidth,
    height: cellHeight
  };

  const restylePieceOnDrop = piece => {
    const ps = piece.style;
    ps.position = 'relative';
    ps.top = 0;
    ps.left = 0;
    ps.border = 'none';
    return piece;
  };

  const highlightCell = e => (e.target.style.backgroundColor = '#e0e0e0');
  const deemphasizeCell = e => (e.target.style.backgroundColor = '');
  const dragStart = e => e.preventDefault();
  const dragOver = e => e.preventDefault();

  const drop = async e => {
    // Append piece
    const pieceID = e.dataTransfer.getData('pieceID');
    const piece = document.getElementById(pieceID);
    piece && e.target.append(restylePieceOnDrop(piece));
    // Increment counter and fix current position if it's correct
    if (pieceID === e.target.dataset.id) {
      await incrementCounter();
      await checkGameOver();
      piece.draggable = false;
    }
  };

  return (
    <div
      className='cell'
      data-id={dataID}
      style={style}
      onDragStart={dragStart}
      onDragEnter={highlightCell}
      onDragLeave={deemphasizeCell}
      onDragOver={dragOver}
      onDrop={drop}
    ></div>
  );
};

Cell.propTypes = {
  dataID: PropTypes.number,
  cellWidth: PropTypes.number,
  cellHeight: PropTypes.number,
  incrementCounter: PropTypes.func,
  checkGameOver: PropTypes.func
};

export default Cell;
