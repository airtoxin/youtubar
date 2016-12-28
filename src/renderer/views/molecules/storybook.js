import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Corner from './Corner';
import PlayPauseButton from './PlayPauseButton';
import VolumeButton from './VolumeButton';

storiesOf('Corner', module)
  .add('with default', () => (
    <Corner src="https://www.google.com/logos/2012/turing-doodle-static.jpg"/>
  ));

storiesOf('PlayPauseButton', module)
  .add('with default', () => (
    <PlayPauseButton disabled={false} paused={false}/>
  ))
  .add('with disabled', () => (
    <PlayPauseButton disabled={true} paused={false}/>
  ))
  .add('with paused', () => (
    <PlayPauseButton disabled={false} paused={true}/>
  ));

storiesOf('VolumeButton', module)
  .add('with default', () => (
    <VolumeButton mute={false} volume={100}/>
  ))
  .add('with small volume', () => (
    <VolumeButton mute={false} volume={10}/>
  ))
  .add('with mute', () => (
    <VolumeButton mute={true} volume={100}/>
  ));
