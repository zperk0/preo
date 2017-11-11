
import controller from './manageUsers.controller'

/**
 * Routing function for manageUsers
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider, Permissions) {
  "ngInject";
  $stateProvider.state("main.dashboard.manageUsers", {
    url: "/manageUsers",
    template: require("./manageUsers.tpl.html"),
    controller: controller.UID,
    controllerAs: "manageUsersCtrl",
    requiresPermission: Permissions.ACCOUNT,
    resolve:{
      permissions: function($q, $stateParams, authenticated, StateService, PermissionService) {

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
    }
  });
}
