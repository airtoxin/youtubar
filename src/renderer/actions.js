import * as searchService from './services/search';
import tr from './tree';

export function callAction(fn, ...args) {
  fn(tr, ...args);
}

export function saveAuthToken(tree, token) {
  tree.set(['auth', 'token'], token);
}

export function search(tree, q) {
  tree.set(['search'], {
    query: q,
    items: [],
  });

  searchService.search(q).then((items) => {
    tree.set(['search', 'items'], items);
  });
}

export function addQueue(tree, item) {
  tree.push(['queue'], item);
}
