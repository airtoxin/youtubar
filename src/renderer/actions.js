import * as searchService from './services/search';

export function search(tree, q) {
  tree.set(['search'], {
    query: q,
    items: [],
  });

  searchService.search(q).then(items => {
    tree.set(['search', 'items'], items);
  });
}
