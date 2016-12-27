import { rendererTree } from '../synced-tree';

const tree = rendererTree({
  auth: {
    token: null,
  },
  search: {
    query: '',
    items: [],
  },
  queue: [],
  player: {
    nowPlaying: null,
    state: 'paused',
  },
});

export default tree;
