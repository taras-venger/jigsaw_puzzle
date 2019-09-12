import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Board from './components/Board';
import Image from './components/Image';
import Frame from './components/Frame';
import Piece from './components/Piece';
import Navbar from './components/Navbar';
import Backdrop from './components/Backdrop';
import SlidersContainer from './components/SlidersContainer';
import Slider from './components/Slider';
import Spinner from './components/Spinner';
import Icon from './components/Icon';
import RefreshIcon from './icons/refresh.png';
import PlayIcon from './icons/play.png';
import SettingsIcon from './icons/settings.png';
import ViewIcon from './icons/view.png';

class App extends Component {
  state = {
    imageURL: '',
    imageWidth: 880,
    imageHeight: 620,
    numberOfRows: 5,
    numberOfColumns: 6,
    pieces: [],
    gameStarted: false,
    viewImage: false,
    showSettings: false,
    showSpinner: false,
    gameOver: false
  };

  getImage = () => {
    const { imageWidth, imageHeight } = this.state;
    this.setState({ showSpinner: true });
    axios
      .get(`https://source.unsplash.com/random/${imageWidth}x${imageHeight}`)
      .then(image =>
        this.setState({
          imageURL: image.request.responseURL,
          showSpinner: false
        })
      );
  };

  componentDidMount() {
    this.getImage();
  }

  cutImage = (image, imgWidth, imgHeight, rows, columns) => {
    let pieces = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        const piece = document.createElement('canvas');
        const context = piece.getContext('2d');
        piece.width = imgWidth / columns; //rounds down
        piece.height = imgHeight / rows; //rounds down
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

  transformPieces = pieces => {
    if (pieces.length > 0) {
      return pieces.map((piece, index) => {
        const { width, height, url } = piece;
        return (
          <Piece
            key={index}
            id={index}
            width={width}
            height={height}
            url={url}
            checkGameOver={this.checkGameOver}
          />
        );
      });
    }
  };

  // Since setting up canvas size in the 'cutImage' function rounds down calculated pieces'
  // width & height, initial img size must be racalculated in order to eliminate the difference
  // between the image and pieces' size:
  reCalculaeImgSize = (imgWidth, imgHeight, rows, columns) => {
    const imgFinalWidth = Math.floor(imgWidth / columns) * columns;
    const imgFinalHeight = Math.floor(imgHeight / rows) * rows;
    return {
      imgFinalWidth,
      imgFinalHeight
    };
  };

  startGame = () => {
    const {
      imageURL,
      imageWidth,
      imageHeight,
      numberOfRows,
      numberOfColumns
    } = this.state;

    const { imgFinalWidth, imgFinalHeight } = this.reCalculaeImgSize(
      imageWidth,
      imageHeight,
      numberOfRows,
      numberOfColumns
    );

    const img = document.createElement('img');
    img.crossOrigin = 'anonymous';
    img.src = imageURL;

    img.onload = () => {
      const pieces = this.cutImage(
        img,
        imgFinalWidth,
        imgFinalHeight,
        numberOfRows,
        numberOfColumns
      );

      const pieces2 = this.transformPieces(pieces);
      this.setState({
        imageWidth: imgFinalWidth,
        imageHeight: imgFinalHeight,
        pieces: pieces2,
        gameStarted: true
      });
    };
  };

  toggleSettingsModal = () =>
    this.setState(({ showSettings }) => ({ showSettings: !showSettings }));

  toggleViewImage = () => this.setState({ viewImage: !this.state.viewImage });

  checkGameOver = () => {
    const numberOfPieces = this.state.pieces.length;
    let matches = 0;
    const cells = [...document.getElementsByClassName('cell')];
    cells.forEach(cell => {
      if (cell.childNodes[0]) {
        cell.getAttribute('data-cell-id') === cell.childNodes[0].id &&
          matches++;
      }
    });
    numberOfPieces > 0 &&
      numberOfPieces === matches &&
      this.setState({ gameOver: true });
  };

  componentDidUpdate() {
    setTimeout(() => this.state.gameOver && alert('Well done!'), 0);
  }

  render() {
    const gameStarted = this.state.gameStarted;
    const gameOver = this.state.gameOver;
    const showSpinner = this.state.showSpinner;

    return (
      <div className='App'>
        <div className='container'>
          <Board>
            <Navbar>
              <Icon
                enabled={!gameStarted}
                src={RefreshIcon}
                title='New image'
                click={!gameStarted ? this.getImage : undefined}
              />
              <Icon
                enabled={!gameStarted}
                src={SettingsIcon}
                title='Settings'
                click={!gameStarted ? this.toggleSettingsModal : undefined}
              />
              <Icon
                enabled={!gameStarted}
                src={PlayIcon}
                title='Start'
                click={!gameStarted ? this.startGame : undefined}
              />
              <Icon
                enabled={!gameOver}
                src={ViewIcon}
                title='View'
                click={!gameOver ? this.toggleViewImage : undefined}
              />
            </Navbar>
            <Image
              url={this.state.imageURL}
              imageWidth={this.state.imageWidth}
              imageHeight={this.state.imageHeight}
              hideImage={gameStarted}
            />
            {showSpinner && (
              <Backdrop>
                <Spinner />
              </Backdrop>
            )}
            {this.state.pieces}
          </Board>
          <Frame
            imageWidth={this.state.imageWidth}
            imageHeight={this.state.imageHeight}
            rows={this.state.numberOfRows}
            columns={this.state.numberOfColumns}
          />
          {this.state.viewImage && (
            <Backdrop click={this.toggleViewImage}>
              <Image
                url={this.state.imageURL}
                imageWidth={this.state.imageWidth}
                imageHeight={this.state.imageHeight}
              />
            </Backdrop>
          )}
          {this.state.showSettings && (
            <SlidersContainer>
              <Slider
                title='Rows'
                getValue={e =>
                  this.setState({ numberOfRows: parseInt(e.target.value) })
                }
                defaultValue={this.state.numberOfRows}
              />
              <Slider
                title='Columns'
                getValue={e =>
                  this.setState({ numberOfColumns: parseInt(e.target.value) })
                }
                defaultValue={this.state.numberOfColumns}
              />
              <button className='btn' onClick={this.toggleSettingsModal}>
                OK
              </button>
            </SlidersContainer>
          )}
        </div>
      </div>
    );
  }
}

export default App;
