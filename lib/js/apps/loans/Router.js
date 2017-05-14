import UrlPattern from 'url-pattern';

// TODO: query objects
// TODO: protect navigating away from unsaved changes

class Route {
  constructor (activity, path, details = {}) {
    this.internals = {
      urlPattern: new UrlPattern(path)
    };
    this.activity = activity;
    this.path = path;
    this.details = details;
  }

  buildActivity (path, query) {
    return {
      name: this.activity,
      ...this.internals.urlPattern.match(path),
      query
    }
  }

  match (path) {
    return !!this.internals.urlPattern.match(path);
  }
}

const router = {
  internals: {
    routeList: []
  },

  add (activity, path, details = {}) {
    const route = new Route(activity, path, details);
    this.internals.routeList.push(route);
  },

  routes: {
  },

  match (path, query) {
    for (let route of this.internals.routeList) {
      if (route.match(path)) {
        return route.buildActivity(path, query);
      }
    }
    return null;
  }
};

router.add('home', '/');
router.add('createLoan', '/loans/new');
router.add('editLoan', '/loans/:loanId/edit');
router.add('showLoan', '/loans/:loanId');
router.add('listLoans', '/loans/');

export default router; // { match, routes }
