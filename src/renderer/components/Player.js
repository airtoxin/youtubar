import React, { PropTypes } from 'react';
import { branch } from 'baobab-react/higher-order';
import Youtube from 'react-youtube';
import styles from './Player.css';

const Player = ({ playing }) => {
  if (!playing) return null;

  return (
    <div className={styles.hidden}>
      <Youtube
        videoId={playing.id.videoId}
        id="playing-video"
        onReady={event => event.target.playVideo()}
      />
    </div>
  );
}

export default branch({
  playing: ['playing'],
}, Player);
