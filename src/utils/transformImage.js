import React from 'react';
import Piece from '../components/Piece';

const loadImage = url => {
  return new Promise(resolve => {
    const image = document.createElement('img');
    image.crossOrigin = 'anonymous';
    image.src = url;
    image.onload = () => resolve(image);
  });
};

const cutImage = (
  image,
  imgWidth,
  imgHeight,
  numberOfRows,
  numberOfColumns
) => {
  let pieces = [];
  for (let y = 0; y < numberOfRows; y++) {
    for (let x = 0; x < numberOfColumns; x++) {
      const piece = document.createElement('canvas');
      const context = piece.getContext('2d');
      piece.width = imgWidth / numberOfColumns; //rounds down
      piece.height = imgHeight / numberOfRows; //rounds down
      context.drawImage(
        image,
        x * piece.width,
        y * piece.height,
        piece.width,
        piece.height,
        0,
        0,
        piece.width,
        piece.height
      );
      pieces.push({
        width: piece.width,
        height: piece.height,
        url: piece.toDataURL()
      });
    }
  }
  return pieces;
};

const transformPieces = pieces =>
  pieces.map((piece, index) => {
    const { width, height, url } = piece;
    return (
      <Piece key={index} id={index} width={width} height={height} url={url} />
    );
  });

// Since setting up canvas size in the 'cutImage' function rounds down calculated pieces'
// width & height, initial img size must be racalculated in order to eliminate the difference
// between the image and pieces' size:
export const adjustSize = (initialSize, numberOfPieces) =>
  Math.floor(initialSize / numberOfPieces) * numberOfPieces;

export const transformImage = async (url, width, height, rows, columns) => {
  const img = await loadImage(url);
  const adjWidth = adjustSize(width, columns);
  const adjHeight = adjustSize(height, rows);
  const pieces = cutImage(img, adjWidth, adjHeight, rows, columns);
  const transformedPieces = transformPieces(pieces);
  return {
    pieces: transformedPieces,
    imageWidth: adjWidth,
    imageHeight: adjHeight
  };
};
