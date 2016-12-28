import React, { PropTypes } from 'react';
import VolumeDown from 'react-icons/lib/fa/volume-down';
import VolumeUp from 'react-icons/lib/fa/volume-up';
import VolumeOff from 'react-icons/lib/fa/volume-off';

const VolumeButton = ({ mute, volume }) => {
  if (mute) return <VolumeOff />;

  return volume <= 50 ? <VolumeDown /> : <VolumeUp />;
};

VolumeButton.propTypes = {
  mute: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
};

export default VolumeButton;
