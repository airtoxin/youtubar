import * as searchService from './services/search';
import tree from './tree';

export function callAction(fn, ...args) {
  fn(tree, ...args);
}

export function saveAuthToken(tree, token) {
  tree.set(['auth', 'token'], token);
}

export function search(tree, q) {
  tree.set(['search'], {
    query: q,
    items: [],
  });

  searchService.search(q).then(items => {
    tree.set(['search', 'items'], items);
  });
}
