import { PropTypes } from 'react';

export const videoType = PropTypes.shape({
  id: PropTypes.shape({
    videoId: PropTypes.string.isRequired,
  }).isRequired,
  snippet: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnails: PropTypes.shape({
      default: PropTypes.shape({
        url: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
});

export const searchType = {
  queryType: PropTypes.string.isRequired,
  itemsType: PropTypes.arrayOf(videoType).isRequired,
};

export const queueType = PropTypes.arrayOf(videoType).isRequired;

export const passedQueueType = queueType;

export const playerType = {
  nowPlayingType: videoType,
  stateType: PropTypes.oneOf(['paused', 'playing']).isRequired,
  volumeType: PropTypes.number.isRequired,
  isMuteType: PropTypes.bool.isRequired,
};
