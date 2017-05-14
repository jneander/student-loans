import Route from 'routing/lib/Route';

class Router {
  constructor () {
    this.internals = {
      routeList: []
    };
    this.urls = {};
  }

  add (name, path, details = {}) {
    const route = new Route(name, path, details);
    this.internals.routeList.push(route);
    this.urls[`${name}Url`] = route.buildUrl.bind(route);
  }

  match (path, query) {
    for (let route of this.internals.routeList) {
      if (route.match(path)) {
        return route.buildActivity(path, query);
      }
    }
    return null;
  }
}

export default Router;
