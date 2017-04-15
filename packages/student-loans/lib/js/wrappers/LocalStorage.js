export function get (key, defaultValue = null) {
  return new Promise((resolve) => {
    resolve(window.localStorage.getItem(key) || defaultValue);
  });
}

export function remove (key) {
  return new Promise((resolve) => {
    window.localStorage.removeItem(key);
    resolve(true);
  });
}

export function set (key, value) {
  return new Promise((resolve) => {
    window.localStorage.setItem(key, value);
    resolve(true);
  });
}

export default {
  get, remove, set
}
