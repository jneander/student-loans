import Router from '../lib/Router';

describe('Router', () => {
  let router;

  beforeEach(() => {
    router = new Router();
    router.add('showPerson', '/people/:id');
    router.add('listPeople', '/people/');
  });

  describe('#match', () => {
    it('returns the name of the matching route', () => {
      expect(router.match('/people/123')).toEqual('showPerson');
    });

    it('exists', () => {
      expect(Router).to.exist;
    });
  });
});
