const LocalStorage = {
  get (key, default = null) {
    return window.localStorage.getItem(key) || default;
  },

  remove (key) {
    window.localStorage.removeItem(key);
  },

  set (key, value) {
    window.localStorage.setItem(key, value);
  }
};

export default LocalStorage;
