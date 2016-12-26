import { rendererTree } from '../synced-tree';
import * as localStorageService from './services/localstorage';

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

Object.entries(localStorageService.getAll()).forEach(([key, value]) => {
  tree.set(key.split('/'), value);
});

tree.select(['auth', 'token']).on('update', (updatee) => {
  const token = updatee.target.get();
  if (token) {
    localStorageService.set(updatee.target.path.join('/'), token);
  }
});

export default tree;
