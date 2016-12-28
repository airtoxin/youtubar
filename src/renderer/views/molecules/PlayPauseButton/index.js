import React, { PropTypes } from 'react';
import PlayCircle from 'react-icons/lib/fa/play-circle-o';
import PauseCircle from 'react-icons/lib/fa/pause-circle-o';
import common from '../../common.css';

const PlayPauseButton = ({ disabled, paused }) => {
  const Icon = paused ? PlayCircle : PauseCircle;
  const className = disabled ? common.disabled : '';

  return <Icon className={className} />;
};

PlayPauseButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  paused: PropTypes.bool.isRequired,
};

export default PlayPauseButton;
