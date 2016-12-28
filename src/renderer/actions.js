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

export function moveToPassedQueue(tree, index) {
  const cursor = tree.select(['queue']);
  const video = cursor.get(index);
  if (video) {
    const queue = cursor.get();
    const newQueue = [].concat(queue.slice(0, index), queue.slice(index + 1, queue.length));

    cursor.set(newQueue);
    tree.push(['passedQueue'], video);
  }
}

export function deleteFromQueue(tree, index) {
  const cursor = tree.select(['queue']);
  const queue = cursor.get();
  const newQueue = [].concat(queue.slice(0, index), queue.slice(index + 1, queue.length));
  cursor.set(newQueue);
}

export function rewindQueue(tree) {
  const queueCursor = tree.select(['queue']);
  const passedQueueCursor = tree.select(['passedQueue']);

  const passedQueue = passedQueueCursor.get();
  const passedVideo = passedQueueCursor.get(passedQueue.length - 1);
  const newPassedQueue = passedQueue.slice(0, passedQueue.length - 1);

  if (!passedVideo) return;

  const queue = queueCursor.get();
  const newQueue = [passedVideo].concat(queue);

  queueCursor.set(newQueue);
  passedQueueCursor.set(newPassedQueue);
}

export function togglePlayPause(tree) {
  const cursor = tree.select(['player', 'state']);
  switch (cursor.get()) {
    case 'paused':
      return cursor.set('playing');
    case 'playing':
      return cursor.set('paused');
    default:
      return null;
  }
}

export function setVolume(tree, volume) {
  tree.set(['player', 'volume'], volume);
}

export function mutePlayer(tree) {
  tree.set(['player', 'isMute'], true);
}

export function unmutePlayer(tree) {
  tree.set(['player', 'isMute'], false);
}

export function toggleMute(tree) {
  const cursor = tree.select(['player', 'isMute']);
  cursor.set(!cursor.get());
}
