import lodash from 'lodash';
import * as localStorageService from './services/localstorage';

function splitPaths(tree, updatee, next) {
  updatee.data.paths.forEach(path => {
    const copy = lodash.cloneDeep(updatee);
    copy.data.paths = [path];
    next(tree, copy);
  });
}

function serializeToken(tree, updatee, next) {
  if (lodash.isEqual(updatee.data.paths[0], ['auth', 'token'])) {
    localStorageService.set(updatee.data.paths[0].join('/'), updatee.target.get(updatee.data.paths[0]));
  }
  next(tree, updatee);
}

function log(tree, updatee, next) {
  console.group('update:', updatee.data.paths[0]);
  console.log(updatee.target.get(updatee.data.paths[0]));
  console.groupEnd();
  next(tree, updatee);
}

export default [
  splitPaths,
  serializeToken,
  log,
];
