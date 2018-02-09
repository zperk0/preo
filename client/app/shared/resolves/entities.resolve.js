
export default function entitiesResolve($q, StateService, Spinner, authenticated) {
  'ngInject';

  const deferred = $q.defer();
  const LOADER_KEY = 'fetch-entities';

  Spinner.show(LOADER_KEY);

  StateService.fetchVenues('group_venueids')
    .then(entities => {
      console.log('[EntitiesResolve] entities', entities);
      deferred.resolve(entities);
    }).catch(err => {
      console.log('[EntitiesResolve] error', err);
      deferred.reject(err);
    }).finally(() => {
      Spinner.hide(LOADER_KEY);
    });

  return deferred.promise;
}
