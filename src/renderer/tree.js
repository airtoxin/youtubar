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
  playing: null,
  player: 'paused',
});

export default tree;
