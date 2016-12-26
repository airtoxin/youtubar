const PREFIX = 'localStorageService-';

export function set(key, value) {
  global.window.localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
}

export function get(key) {
  return JSON.parse(global.window.localStorage.getItem(key));
}

export function getAll() {
  return Object.entries(global.window.localStorage)
    .filter(([key]) => key.startsWith(PREFIX))
    .map(([key, value]) => {
      const originalKey = key.slice(PREFIX.length);
      return { [originalKey]: JSON.parse(value) };
    })
    .reduce((ob, kv) => ({ ...ob, ...kv }), {});
}
