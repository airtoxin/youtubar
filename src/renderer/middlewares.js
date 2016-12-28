import lodash from 'lodash';
import * as localStorageService from './services/localstorage';
import apiClientService from './services/api-client';

const MAX_PASSED_QUEUE_SIZE = 50;

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
    if (video) {
      tree.set(['player', 'nowPlaying'], video);
      tree.set(['player', 'state'], 'playing');
    }
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

function forgetPassedQueue(tree, updatee, next) {
  if (lodash.isEqual(updatee.data.paths[0][0], 'passedQueue')) {
    const passedQueue = updatee.target.get(['passedQueue']);
    if (passedQueue.length > MAX_PASSED_QUEUE_SIZE) {
      tree.set(['passedQueue'], passedQueue.slice(
        passedQueue.length - MAX_PASSED_QUEUE_SIZE,
        passedQueue.length
      ));
    }
  }
  next(tree, updatee);
}

function serializeToken(tree, updatee, next) {
  if (lodash.isEqual(updatee.data.paths[0][0], 'search')) {
    const value = updatee.target.get('search');
    localStorageService.set('search', value);
  }
  next(tree, updatee);
}

function serializeSearch(tree, updatee, next) {
  if (matchPath(updatee, ['auth', 'token'])) {
    const value = getTarget(updatee);
    localStorageService.set(updatee.data.paths[0].join('/'), value);
  }
  next(tree, updatee);
}

function serializeQueue(tree, updatee, next) {
  if (matchPath(updatee, ['queue'])) {
    const value = getTarget(updatee);
    localStorageService.set(updatee.data.paths[0].join('/'), value);
  }
  next(tree, updatee);
}

function serializePassedQueue(tree, updatee, next) {
  if (lodash.isEqual(updatee.data.paths[0][0], 'passedQueue')) {
    const value = updatee.target.get('passedQueue');
    localStorageService.set('passedQueue', value);
  }
  next(tree, updatee);
}

function serializePlayer(tree, updatee, next) {
  if (matchPath(updatee, ['player', 'volume']) || matchPath(updatee, ['player', 'isMute'])) {
    const value = getTarget(updatee);
    localStorageService.set(updatee.data.paths[0].join('/'), value);
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
  forgetPassedQueue,
  serializeToken,
  serializeQueue,
  serializePassedQueue,
  serializePlayer,
  updateClientToken,
  log,
];
