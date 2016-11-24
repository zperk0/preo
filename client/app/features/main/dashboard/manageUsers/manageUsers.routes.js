
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
      auth:function(authenticated){
        return authenticated
      }
    }
  });
}
