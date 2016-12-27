import lodash from 'lodash';
import * as localStorageService from './services/localstorage';
import apiClientService from './services/api-client';

const matchPath = (updatee, path) => lodash.isEqual(updatee.data.paths[0], path);

const getTarget = updatee => updatee.target.get(updatee.data.paths[0]);

function splitPaths(tree, updatee, next) {
  updatee.data.paths.forEach((path) => {
    const copy = lodash.cloneDeep(updatee);
    copy.data.paths = [path];
    next(tree, copy);
  });
}

function playWhenVideoAddedFirstTime(tree, updatee, next) {
  if (matchPath(updatee, ['queue', '0'])) {
    const video = getTarget(updatee);
    tree.set(['player', 'nowPlaying'], video);
    tree.set(['player', 'state'], 'playing');
  }
  next(tree, updatee);
}

function whenUpdateQueue(tree, updatee, next) {
  if (matchPath(updatee, ['queue'])) {
    const video = tree.get(['queue', '0']);
    if (video) {
      tree.set(['player', 'nowPlaying'], video);
      tree.set(['player', 'state'], 'playing');
    } else {
      tree.set(['player', 'nowPlaying'], null);
      tree.set(['player', 'state'], 'paused');
    }
  }
  next(tree, updatee);
}

function serializeToken(tree, updatee, next) {
  if (matchPath(updatee, ['auth', 'token'])) {
    const token = getTarget(updatee);
    localStorageService.set(updatee.data.paths[0].join('/'), token);
  }
  next(tree, updatee);
}

function updateClientToken(tree, updatee, next) {
  if (matchPath(updatee, ['auth', 'token'])) {
    const token = getTarget(updatee);
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
  playWhenVideoAddedFirstTime,
  whenUpdateQueue,
  serializeToken,
  updateClientToken,
  log,
];
