
export default function scrollToUser($stateParams, $state, $timeout) {
  "ngInject";

  return {
    restrict: 'A',
    link: (ng, element, attrs) => {

      $timeout(() => {
      	if ($stateParams.inviteId || $state.current.name === 'main.dashboard.manageUsers.newInvite') {
					ng['manageUsersCtrl'].$scope.$broadcast('$scrollToChildElement', ".users-invite-list .user-invite[data-id='" + ($stateParams.inviteId || 'new') + "']");
      	} else if ($stateParams.userId) {
					ng['manageUsersCtrl'].$scope.$broadcast('$scrollToChildElement', ".users-list .user[data-id='" + $stateParams.userId + "']");
      	}
      });
    }
  };
}