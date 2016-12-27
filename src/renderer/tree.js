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
});

export default tree;
