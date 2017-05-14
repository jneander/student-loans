import ActionHelper from 'js/shared/helpers/ActionHelper';
import Router from 'js/apps/loans/Router';
import History from 'js/wrappers/History';

const history = new History();

const Constants = ActionHelper.createConstants([
  'SET_ACTIVITY'
]);

const RoutingActions = {
  ...Constants,

  initialize () {
    return function (dispatch, getState) {
      history.listen(({ path, query }) => {
        const activity = Router.match(path, query);
        dispatch(RoutingActions.setActivity(activity));
      });
      const location = history.getCurrentLocation();
      const activity = Router.match(location.path, location.query);
      dispatch(RoutingActions.setActivity(activity));
    }
  },

  teardown () {
    history.unlisten();
  },

  setActivity (payload) {
    return { type: Constants.SET_ACTIVITY, payload };
  },

  pushLocation (location) {
    return function () {
      history.pushLocation(location);
    }
  },

  pushQuery (query, merge = false) {
    return function () {
      const location = history.getCurrentLocation();
      let newQuery = query;
      if (merge) {
        newQuery = { ...location.query, query };
      }
      history.pushLocation({ ...location, query: newQuery });
    }
  },

  replaceLocation (location) {
    return function () {
      history.replaceLocation(location);
    }
  },

  replaceQuery (query, merge = false) {
    return function () {
      const location = history.getCurrentLocation();
      let newQuery = query;
      if (merge) {
        newQuery = { ...location.query, query };
      }
      history.replaceLocation({ ...location, query: newQuery });
    }
  }
};

export default RoutingActions;
