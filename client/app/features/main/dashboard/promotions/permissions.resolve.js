
export default function permissionsResolve ($q, $stateParams, authenticated, StateService, PermissionService) {
  "ngInject";

  if (!StateService.isChannel) {
    return $q.when(PermissionService.permissions);
  }

  const deferred = $q.defer();

  StateService.loadPermissions("venues,groups")
    .then(() => {

      deferred.resolve(PermissionService.permissions);
    }, () => {

      $timeout(() => {
        $state.go('main.dashboard', {
          entityId: $stateParams.entityId
        });
      });

      deferred.reject();
    });

  return deferred.promise;
}