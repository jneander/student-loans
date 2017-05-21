const LocalStorage = {
  get (key, defaultValue = null) {
    return new Promise((resolve) => {
      resolve(window.localStorage.getItem(key) || defaultValue);
    });
  },

  remove (key) {
    return new Promise((resolve) => {
      window.localStorage.removeItem(key);
      resolve(true);
    });
  },

  set (key, value) {
    return new Promise((resolve) => {
      window.localStorage.setItem(key, value);
      resolve(true);
    });
  }
};

export default LocalStorage;
