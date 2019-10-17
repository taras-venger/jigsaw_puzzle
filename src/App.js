import React, { Component } from 'react';
import './App.css';
import { fetchImage } from './utils/fetchImage';
import { transformImage } from './utils/transformImage';
import Board from './components/Board';
import Image from './components/Image';
import Frame from './components/Frame';
import Navbar from './components/Navbar';
import Backdrop from './components/Backdrop';
import SlidersContainer from './components/SlidersContainer';
import Slider from './components/Slider';
import Spinner from './components/Spinner';

class App extends Component {
  state = {
    imageURL: '',
    imageWidth: 880,
    imageHeight: 620,
    numberOfRows: 1,
    numberOfColumns: 2,
    pieces: [],
    gameStarted: false,
    viewImage: false,
    showSettings: false,
    showSpinner: false,
    counter: 0,
    gameOver: false
  };

  getImage = async () => {
    this.setState({ showSpinner: true });
    const { imageWidth, imageHeight } = this.state;
    const url = await fetchImage(imageWidth, imageHeight);
    this.setState({ imageURL: url, showSpinner: false });
  };

  componentDidMount() {
    this.getImage();
  }

  startGameHandler = async () => {
    const {
      imageURL,
      imageWidth,
      imageHeight,
      numberOfRows,
      numberOfColumns
    } = this.state;
    const transformed = await transformImage(
      imageURL,
      imageWidth,
      imageHeight,
      numberOfRows,
      numberOfColumns
    );
    this.setState({
      ...transformed,
      gameStarted: true
    });
  };

  toggleSettingsModal = () =>
    this.setState({ showSettings: !this.state.showSettings });

  toggleViewImage = () => this.setState({ viewImage: !this.state.viewImage });

  incrementCounter = () =>
    this.setState(({ counter }) => ({ counter: counter + 1 }));

  checkGameOver = () => {
    const numberOfPieces = this.state.pieces.length;
    const counter = this.state.counter;
    counter > 0 &&
      counter === numberOfPieces &&
      this.setState({ gameOver: true });
  };

  componentDidUpdate() {
    this.state.gameOver && setTimeout(() => alert('Well done!'), 0);
  }

  render() {
    const {
      imageURL,
      imageWidth,
      imageHeight,
      numberOfRows,
      numberOfColumns,
      gameStarted,
      gameOver,
      showSpinner,
      showSettings,
      viewImage
    } = this.state;

    return (
      <div className='App'>
        <div className='container'>
          <Board>
            <Navbar
              gameStarted={gameStarted}
              gameOver={gameOver}
              getImage={this.getImage}
              startGameHandler={this.startGameHandler}
              toggleViewImage={this.toggleViewImage}
              toggleSettingsModal={this.toggleSettingsModal}
            />
            <Image
              url={imageURL}
              imageWidth={imageWidth}
              imageHeight={imageHeight}
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
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            rows={numberOfRows}
            columns={numberOfColumns}
            incrementCounter={this.incrementCounter}
            checkGameOver={this.checkGameOver}
          />
          {viewImage && (
            <Backdrop click={this.toggleViewImage}>
              <Image
                url={imageURL}
                imageWidth={imageWidth}
                imageHeight={imageHeight}
              />
            </Backdrop>
          )}
          {showSettings && (
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
