import React from 'react';
import PropTypes from 'prop-types';

const Cell = props => {
  const { dataID, cellWidth, cellHeight } = props;

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
  const drop = e => {
    const pieceID = e.dataTransfer.getData('pieceID');
    const piece = document.getElementById(pieceID);
    piece && e.target.append(restylePieceOnDrop(piece));
  };

  return (
    <div
      className='cell'
      data-cell-id={dataID}
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
  cellWidth: PropTypes.number,
  cellHeight: PropTypes.number
};

export default Cell;
