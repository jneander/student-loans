import UrlPattern from 'url-pattern';

class Route {
  constructor (activityName, path, details = {}) {
    this.internals = {
      urlPattern: new UrlPattern(path)
    };
    this.activityName = activityName;
    this.path = path;
    this.details = details;
  }

  buildActivity (path, query) {
    return {
      name: this.activityName,
      ...this.internals.urlPattern.match(path),
      query
    }
  }

  buildHelpers () {
    return {
      url (pathValues, query = {}) {
        const pathString = this.internals.urlPattern.stringify(pathValues);
        const queryString = Object.keys(query).length > 0 ? `?${qs.stringify(query)}` : '';
        return pathString + queryString;
      }
    };
  }

  match (path) {
    return !!this.internals.urlPattern.match(path);
  }

  buildUrl (pathValues, query = {}) {
    const pathString = this.internals.urlPattern.stringify(pathValues);
    const queryString = Object.keys(query).length > 0 ? `?${qs.stringify(query)}` : '';
    return pathString + queryString;
  }
}

export default Route;
