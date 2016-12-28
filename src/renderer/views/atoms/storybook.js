import React from 'react';
import { storiesOf, action, linkTo, addDecorator } from '@kadira/storybook';
import Thumbnail from './Thumbnail';
import Title from './Title';

storiesOf('Thumbnail', module)
  .add('with image src', () => (
    <Thumbnail src="https://www.google.com/logos/2012/turing-doodle-static.jpg"/>
  ))
  .add('with broken src', () => (
    <Thumbnail src="https://example.com/image.jpg"/>
  ));

storiesOf('Title', module)
  .add('with text', () => (
    <Title title="title text!"/>
  ))
  .add('with emoji', () => (
    <Title title="✋😊👊"/>
  ))
