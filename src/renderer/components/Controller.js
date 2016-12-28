/* eslint-disable jsx-a11y/no-static-element-interactions,no-nested-ternary */
import React, { Component, PropTypes } from 'react';
import { branch } from 'baobab-react/higher-order';
import PlayCircle from 'react-icons/lib/fa/play-circle-o';
import PauseCircle from 'react-icons/lib/fa/pause-circle-o';
import VolumeDown from 'react-icons/lib/fa/volume-down';
import VolumeUp from 'react-icons/lib/fa/volume-up';
import VolumeOff from 'react-icons/lib/fa/volume-off';
import Back from 'react-icons/lib/fa/fast-backward';
import Skip from 'react-icons/lib/fa/fast-forward';
import {
  rewindQueue,
  togglePlayPause,
  setVolume,
  toggleMute,
  unmutePlayer,
  moveToPassedQueue,
} from '../actions';
import styles from './Controller.css';


class Controller extends Component {
  constructor() {
    super();

    this.handleClickBack = this.handleClickBack.bind(this);
    this.handleClickPlayPause = this.handleClickPlayPause.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleClickVolumeIcon = this.handleClickVolumeIcon.bind(this);
    this.handleClickSkip = this.handleClickSkip.bind(this);
  }

  handleClickBack() {
    this.props.dispatch(rewindQueue);
  }

  handleClickPlayPause() {
    this.props.dispatch(togglePlayPause);
  }

  handleSliderChange(event) {
    this.props.dispatch(setVolume, +event.target.value);
    this.props.dispatch(unmutePlayer);
  }

  handleClickVolumeIcon() {
    this.props.dispatch(toggleMute);
  }

  handleClickSkip() {
    this.props.dispatch(moveToPassedQueue, 0);
  }

  renderPlayPause() {
    if (this.props.queue.length === 0) {
      return (
        <section><PlayCircle className={styles.disabled} /></section>
      );
    }

    return (
      <section onClick={this.handleClickPlayPause}>
        {this.props.playerState === 'paused' ?
          <PlayCircle /> : this.props.playerState === 'playing' ?
            <PauseCircle /> :
          null}
      </section>
    );
  }

  renderVolumeIcon() {
    let Icon;
    if (this.props.playerIsMute) {
      Icon = VolumeOff;
    } else {
      Icon = this.props.playerVolume <= 50 ?
        VolumeDown : VolumeUp;
    }

    return <section onClick={this.handleClickVolumeIcon}><Icon /></section>;
  }

  render() {
    return (
      <div className={`${styles.flex} ${styles.bar}`}>
        <section onClick={this.handleClickBack}><Back /></section>
        {this.renderPlayPause()}
        <section onClick={this.handleClickSkip}><Skip /></section>
        &nbsp;
        {this.renderVolumeIcon()}
        <input
          type="range"
          min="0"
          max="100"
          value={this.props.playerIsMute ? 0 : this.props.playerVolume}
          onChange={this.handleSliderChange}
        />
      </div>
    );
  }
}

Controller.propTypes = {
  dispatch: PropTypes.func.isRequired,
  playerState: PropTypes.string.isRequired,
  playerVolume: PropTypes.number.isRequired,
  playerIsMute: PropTypes.bool.isRequired,
  queue: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
};

export default branch({
  playerState: ['player', 'state'],
  playerVolume: ['player', 'volume'],
  playerIsMute: ['player', 'isMute'],
  queue: ['queue'],
}, Controller);
