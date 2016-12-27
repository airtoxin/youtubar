import React, { PropTypes, Component } from 'react';
import { branch } from 'baobab-react/higher-order';
import Youtube from 'react-youtube';
import styles from './Player.css';

class Player extends Component {
  constructor() {
    super();

    this.api = null;

    this.handleOnReady = this.handleOnReady.bind(this);
  }

  componentWillUpdate(nextProps) {
    if (!nextProps.playing) return;
    if (!this.api) return;

    switch (nextProps.player) {
      case 'playing':
        return this.api.playVideo();
      case 'paused':
        return this.api.pauseVideo();
    }
  }

  handleOnReady(event) {
    event.target.playVideo();
    this.api = event.target;
  }

  render() {
    if (!this.props.playing) return null;

    return (
      <div className={styles.hidden}>
        <Youtube
          videoId={this.props.playing.id.videoId}
          id="playing-video"
          onReady={this.handleOnReady}
        />
      </div>
    );
  }
}

export default branch({
  playing: ['playing'],
  player: ['player'],
}, Player);
