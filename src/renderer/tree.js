import { rendererTree } from '../synced-tree';

export default rendererTree({
  count: 0,
  queue: [],
  search: {
    query: '',
    items: [],
  }
});
