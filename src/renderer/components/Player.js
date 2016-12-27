import React, { PropTypes, Component } from 'react';
import { branch } from 'baobab-react/higher-order';
import Youtube from 'react-youtube';
import styles from './Player.css';
import { removeQueue } from '../actions';

class Player extends Component {
  constructor() {
    super();

    this.api = null;

    this.handleOnReady = this.handleOnReady.bind(this);
    this.handleOnStateChange = this.handleOnStateChange.bind(this);
    this.handleOnEnd = this.handleOnEnd.bind(this);
  }

  componentWillUpdate(nextProps) {
    if (!nextProps.playing) return;
    if (!this.api) return;

    this.switchPlayer(nextProps.player);
  }

  switchPlayer(player) {
    switch (player) {
      case 'playing':
        return this.api.playVideo();
      case 'paused':
        return this.api.pauseVideo();
    }
  }

  handleOnReady(event) {
    this.api = event.target;
    this.switchPlayer(this.props.player);
  }

  handleOnStateChange(event) {
    this.api = event.target;
    this.switchPlayer(this.props.player);
  }

  handleOnEnd() {
    this.props.dispatch(removeQueue, 0);
  }

  render() {
    if (!this.props.playing) return null;

    return (
      <div className={styles.hidden}>
        <Youtube
          videoId={this.props.playing.id.videoId}
          id="playing-video"
          onReady={this.handleOnReady}
          onStateChange={this.handleOnStateChange}
          onEnd={this.handleOnEnd}
        />
      </div>
    );
  }
}

export default branch({
  playing: ['playing'],
  player: ['player'],
}, Player);
