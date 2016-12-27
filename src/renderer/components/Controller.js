import React, { Component, PropTypes } from 'react';
import { branch } from 'baobab-react/higher-order';
import PlayCircle from 'react-icons/lib/fa/play-circle-o';
import PauseCircle from 'react-icons/lib/fa/pause-circle-o';
import VolumeDown from 'react-icons/lib/fa/volume-down';
import VolumeUp from 'react-icons/lib/fa/volume-up';
import VolumeOff from 'react-icons/lib/fa/volume-off';
import { togglePlayPause } from '../actions';
import styles from './Controller.css';


class Controller extends Component {
  constructor() {
    super();

    this.handleClickPlayPause = this.handleClickPlayPause.bind(this);
  }

  handleClickPlayPause() {
    this.props.dispatch(togglePlayPause);
  }

  renderPlayPause() {
    if (this.props.queue.length === 0) return <PlayCircle className={styles.disabled}/>;

    return this.props.player === 'paused' ?
      <PlayCircle/> : this.props.player === 'playing' ?
      <PauseCircle/> :
      null
  }

  render() {
    return (
      <div>
        <section onClick={this.handleClickPlayPause}>{this.renderPlayPause()}</section>
        <VolumeDown />
        <VolumeUp />
        <VolumeOff />
      </div>
    );
  }
}

Controller.propTypes = {
  dispatch: PropTypes.func.isRequired,
  player: PropTypes.string.isRequired,
};

export default branch({
  player: ['player'],
  queue: ['queue'],
}, Controller);
