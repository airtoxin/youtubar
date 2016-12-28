/* eslint-disable jsx-a11y/no-static-element-interactions,no-nested-ternary */
import React, { Component, PropTypes } from 'react';
import { branch } from 'baobab-react/higher-order';
import Back from 'react-icons/lib/fa/fast-backward';
import Skip from 'react-icons/lib/fa/fast-forward';
import PlayPauseButton from '../../molecules/PlayPauseButton';
import VolumeButton from '../../molecules/VolumeButton';
import {
  rewindQueue,
  togglePlayPause,
  setVolume,
  toggleMute,
  unmutePlayer,
  moveToPassedQueue,
} from '../../../actions';
import { playerType, queueType } from '../../../proptypes';
import styles from './index.css';
import common from '../../common.css';


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

  render() {
    const playPauseDisabled = this.props.queue.length === 0;
    return (
      <div className={`${common.flexRow} ${styles.center} ${styles.bar}`}>
        <section onClick={this.handleClickBack}>
          <Back />
        </section>
        <section onClick={playPauseDisabled ? () => {} : this.handleClickPlayPause}>
          <PlayPauseButton
            disabled={playPauseDisabled}
            paused={this.props.playerState === 'paused'}
          />
        </section>
        <section onClick={this.handleClickSkip}>
          <Skip />
        </section>

        &nbsp;

        <section onClick={this.handleClickVolumeIcon}>
          <VolumeButton
            mute={this.props.playerIsMute}
            volume={this.props.playerVolume}
          />
        </section>
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
  playerState: playerType.stateType,
  playerVolume: playerType.volumeType,
  playerIsMute: playerType.isMuteType,
  queue: queueType,
};

export default branch({
  playerState: ['player', 'state'],
  playerVolume: ['player', 'volume'],
  playerIsMute: ['player', 'isMute'],
  queue: ['queue'],
}, Controller);
