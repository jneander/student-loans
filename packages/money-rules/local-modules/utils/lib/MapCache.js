export default class MapCache {
  constructor () {
    this._cacheMap = {};
  }

  cache (key, fn) {
    if (this._cacheMap[key]) {
      return this._cacheMap[key];
    }
    this._cacheMap[key] = fn();
    return this._cacheMap[key];
  }
}
