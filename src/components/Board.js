import React from 'react';
import PropTypes from 'prop-types';

const allowDrop = e => {
  e.preventDefault();
};

const drop = e => {
  const pieceID = e.dataTransfer.getData('pieceID');
  const offsetX = e.dataTransfer.getData('offsetX');
  const offsetY = e.dataTransfer.getData('offsetY');
  const piece = document.getElementById(pieceID);
  const ps = piece.style;
  ps.position = 'absolute';
  ps.border = '1px solid black';
  ps.top = e.clientY - offsetY + 'px';
  ps.left = e.clientX - offsetX + 'px';
  e.target.append(piece);
};

const Board = props => (
  <div className='board' onDragOver={allowDrop} onDrop={drop}>
    {props.children}
  </div>
);

Board.propTypes = {
  children: PropTypes.array
};

export default Board;
