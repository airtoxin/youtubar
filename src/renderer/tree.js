import lodash from 'lodash';
import { rendererTree } from '../synced-tree';
import * as localStorageService from './services/localstorage';
import middlewares from './middlewares';

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

// restore values from local storage
Object.entries(localStorageService.getAll()).forEach(([key, value]) => {
  tree.set(key.split('/'), value);
});

// set middlewares
const mdls = lodash.reverse(middlewares.slice());
tree.on('update', updatee => {
  mdls.reduce((next, middleware) => (tr, updt) => middleware(tr, updt, next), () => {})(tree, updatee);
});

export default tree;
