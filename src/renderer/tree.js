import { rendererTree } from '../synced-tree';
import { set, getAll } from './services/localstorage';

const tree = rendererTree({
  auth: {
    token: null,
  },
  search: {
    query: '',
    items: [],
  }
});

Object.entries(getAll()).map(([key, value]) => {
  tree.set(key.split('/'), value);
});

tree.select(['auth', 'token']).on('update', updatee => {
  const token = updatee.target.get();
  if (token) {
    set(updatee.target.path.join('/'), token);
  }
});

export default tree;
