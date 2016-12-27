/* eslint-disable jsx-a11y/no-static-element-interactions,no-nested-ternary */
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
    if (this.props.queue.length === 0) {
      return (
        <section><PlayCircle className={styles.disabled} /></section>
      );
    }

    return (
      <section onClick={this.handleClickPlayPause}>
        {this.props.player === 'paused' ?
          <PlayCircle /> : this.props.player === 'playing' ?
            <PauseCircle /> :
          null}
      </section>
    );
  }

  render() {
    return (
      <div className={`${styles.flex} ${styles.bar}`}>
        {this.renderPlayPause()}
        <section><VolumeDown /></section>
        <section><VolumeUp /></section>
        <section><VolumeOff /></section>
      </div>
    );
  }
}

Controller.propTypes = {
  dispatch: PropTypes.func.isRequired,
  player: PropTypes.string.isRequired,
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
  player: ['player'],
  queue: ['queue'],
}, Controller);
