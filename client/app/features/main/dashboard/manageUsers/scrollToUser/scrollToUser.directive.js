
export default function scrollToUser($rootScope, $stateParams, $state, $timeout) {
  "ngInject";

  return {
    restrict: 'A',
    link: (ng, element, attrs) => {

      // make sure that is the first load
      if (!$rootScope.previousState) {
        $timeout(() => {

          if ($stateParams.inviteId || $state.current.name === 'main.dashboard.manageUsers.newInvite') {
            ng['manageUsersCtrl'].$scope.$broadcast('$scrollToChildElement', ".users-invite-list .user-invite[data-id='" + ($stateParams.inviteId || 'new') + "']");
          } else if ($stateParams.userId) {
            ng['manageUsersCtrl'].$scope.$broadcast('$scrollToChildElement', ".users-list .user[data-id='" + $stateParams.userId + "']");
          }
        });
      }
    }
  };
}