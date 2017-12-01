
export default function entitiesResolve ($q, authenticated, StateService, UserService, Spinner) {
  "ngInject";

  const deferred = $q.defer();
  const LOADER_KEY = 'fetch-entities';

  Spinner.show(LOADER_KEY);

  StateService.fetchVenues('group_venueids').then((entities) => {
    console.log('ManageUsers [entitiesResolve] - got entities', entities);
    deferred.resolve(entities);

    Spinner.hide(LOADER_KEY);
  }, (err) => {
    console.log('ManageUsers [entitiesResolve] - error', err)
    Spinner.hide(LOADER_KEY);
    deferred.reject(err);
  }).catch((err) => {
    Spinner.hide(LOADER_KEY);
    console.log('ManageUsers [entitiesResolve] - catch', err);
    deferred.reject(err);
  });

  return deferred.promise;
}