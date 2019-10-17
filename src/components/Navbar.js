import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../components/Icon';
import RefreshIcon from '../icons/refresh.png';
import PlayIcon from '../icons/play.png';
import SettingsIcon from '../icons/settings.png';
import ViewIcon from '../icons/view.png';

const Navbar = props => {
  const {
    gameStarted,
    gameOver,
    getImage,
    startGameHandler,
    toggleViewImage,
    toggleSettingsModal
  } = props;

  return (
    <div className='navbar'>
      <Icon
        enabled={!gameStarted}
        src={RefreshIcon}
        title='New image'
        click={!gameStarted ? getImage : undefined}
      />
      <Icon
        enabled={!gameStarted}
        src={SettingsIcon}
        title='Settings'
        click={!gameStarted ? toggleSettingsModal : undefined}
      />
      <Icon
        enabled={!gameStarted}
        src={PlayIcon}
        title='Start'
        click={!gameStarted ? startGameHandler : undefined}
      />
      <Icon
        enabled={!gameOver}
        src={ViewIcon}
        title='View'
        click={!gameOver ? toggleViewImage : undefined}
      />
    </div>
  );
};

Navbar.propTypes = {
  gameStarted: PropTypes.bool,
  gameOver: PropTypes.bool,
  getImage: PropTypes.func,
  startGameHandler: PropTypes.func,
  toggleViewImage: PropTypes.func,
  toggleSettingsModal: PropTypes.func
};

export default Navbar;
