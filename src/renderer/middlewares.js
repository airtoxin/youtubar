import lodash from 'lodash';
import * as localStorageService from './services/localstorage';
import apiClientService from './services/api-client';

const matchPath = (updatee, path) => {
  return lodash.isEqual(updatee.data.paths[0], path);
}

function splitPaths(tree, updatee, next) {
  updatee.data.paths.forEach((path) => {
    const copy = lodash.cloneDeep(updatee);
    copy.data.paths = [path];
    next(tree, copy);
  });
}

function playVideoInQueue(tree, updatee, next) {
  if (updatee.data.paths[0][0] === 'queue') {
    if (updatee.data.previousData.queue.length === 0 &&
      updatee.data.currentData.queue.length !== 0) {
      // play!!!!!!!
    }
  }
  next(tree, updatee);
}

function serializeToken(tree, updatee, next) {
  if (matchPath(updatee, ['auth', 'token'])) {
    const token = updatee.target.get(updatee.data.paths[0]);
    localStorageService.set(updatee.data.paths[0].join('/'), token);
  }
  next(tree, updatee);
}

function updateClientToken(tree, updatee, next) {
  if (matchPath(updatee, ['auth', 'token'])) {
    const token = updatee.target.get(updatee.data.paths[0]);
    apiClientService.setAuth(token);
  }
  next(tree, updatee);
}

function log(tree, updatee, next) {
  /* eslint-disable no-console */
  console.group('update:', updatee.data.paths[0]);
  console.log(updatee.target.get(updatee.data.paths[0]));
  console.groupEnd();
  next(tree, updatee);
  /* eslint-enable */
}

export default [
  splitPaths,
  playVideoInQueue,
  serializeToken,
  updateClientToken,
  log,
];