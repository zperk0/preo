
export default function channelPermissionResolve($q, $timeout, $state, StateService, authenticated) {
  'ngInject';

  if (StateService.isChannel) {
    return $q.when();
  }

  $timeout(() => {
    $state.go('main.dashboard.home', {
      entityId: StateService.entityId
    });
  });

  return $q.reject();
}
