/* eslint-disable react/no-unused-prop-types */
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
    if (!nextProps.nowPlaying) return;
    if (!this.api) return;

    this.preparePlayer(nextProps);
  }

  preparePlayer(props) {
    this.api.setVolume(props.volume);
    if (props.isMute) {
      this.api.mute();
    } else {
      this.api.unMute();
    }
    switch (props.playerState) {
      case 'playing':
        return this.api.playVideo();
      case 'paused':
        return this.api.pauseVideo();
      default:
        return null;
    }
  }

  handleOnReady(event) {
    this.api = event.target;
    this.preparePlayer(this.props);
  }

  handleOnStateChange(event) {
    this.api = event.target;
    this.preparePlayer(this.props);
  }

  handleOnEnd() {
    this.props.dispatch(removeQueue, 0);
  }

  render() {
    if (!this.props.nowPlaying) return null;

    return (
      <div className={styles.hidden}>
        <Youtube
          videoId={this.props.nowPlaying.id.videoId}
          id="playing-video"
          onReady={this.handleOnReady}
          onStateChange={this.handleOnStateChange}
          onEnd={this.handleOnEnd}
        />
      </div>
    );
  }
}

Player.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nowPlaying: PropTypes.shape({
    id: PropTypes.shape({
      videoId: PropTypes.string.isRequired,
    }),
    snippet: PropTypes.shape({
      title: PropTypes.string.isRequired,
      thumbnails: PropTypes.shape({
        default: PropTypes.shape({
          url: PropTypes.string.isRequired,
        }),
      }),
    }),
  }),
  playerState: PropTypes.oneOf(['playing', 'paused']).isRequired,
  volume: PropTypes.number.isRequired,
  isMute: PropTypes.bool.isRequired,
};

export default branch({
  nowPlaying: ['player', 'nowPlaying'],
  playerState: ['player', 'state'],
  volume: ['player', 'volume'],
  isMute: ['player', 'isMute'],
}, Player);
