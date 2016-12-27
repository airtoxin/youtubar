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

  const token = { ...tree.get(['auth', 'token']) };
  searchService.search(q, token).then((items) => {
    tree.set(['search', 'items'], items);
  });
}

export function addQueue(tree, item) {
  tree.push(['queue'], item);
}

export function togglePlayPause(tree) {
  const cursor = tree.select(['player']);
  switch (cursor.get()) {
    case 'paused':
      return cursor.set('playing');
    case 'playing':
      return cursor.set('paused');
  }
}
