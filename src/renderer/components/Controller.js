import React, { PropTypes } from 'react';
import { branch } from 'baobab-react/higher-order';
import PlayCircle from 'react-icons/lib/fa/play-circle-o';
import PauseCircle from 'react-icons/lib/fa/pause-circle-o';
import VolumeDown from 'react-icons/lib/fa/volume-down';
import VolumeUp from 'react-icons/lib/fa/volume-up';
import VolumeOff from 'react-icons/lib/fa/volume-off';

const Controller = ({ player }) => {
  return (
    <div>
      <PlayCircle />
      <PauseCircle />
      <VolumeDown />
      <VolumeUp />
      <VolumeOff />
    </div>
  );
}

Controller.propTypes = {
  player: PropTypes.string.isRequired,
};

export default branch({
  player: ['player'],
}, Controller);
