import { func, shape } from 'prop-types';

export default shape({
  getActivity: func.isRequired,
  pushLocation: func.isRequired,
  pushQuery: func.isRequired,
  replaceLocation: func.isRequired,
  replaceQuery: func.isRequired
});
