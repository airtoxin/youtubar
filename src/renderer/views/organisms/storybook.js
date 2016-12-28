import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import QueueItem from './QueueItem';
import SearchItem from './PlayPauseButton';

const item = {
  kind: "youtube#searchResult",
  id: {
    "kind":"youtube#video",
    "videoId":"rpiAS953Lpw"
  },
  "snippet": {
    "publishedAt":"2013-07-05T02:30:04.000Z",
    "channelId":"UCBMP7wA2R4rCORt47io5O1Q",
    "title":"Fez soundtrack - Sync (from game, no jumping or rotation noises)",
    "description": "My favorite level in the game Fez (http://fezgame.com), by Polytron. Music composed and soundtrack available from Disasterpeace ...",
    "thumbnails": {
      "default": {
        "url": "https://i.ytimg.com/vi/rpiAS953Lpw/default.jpg",
        "width": 120,
        "height": 90
      },
    },
    "channelTitle":"freshbagel",
    "liveBroadcastContent":"none"
  }
};

storiesOf('QueueItem', module)
  .add('with default', () => (
    <QueueItem dispatch={action('dispatch')} index={0} item={item}/>
  ));
