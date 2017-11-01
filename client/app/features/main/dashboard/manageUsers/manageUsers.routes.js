
import controller from './manageUsers.controller';
import permissionsResolve from './permissions.resolve';
import usersResolve from './users.resolve';
import invitesResolve from './invites.resolve';


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
    resolve: {
      permissions: permissionsResolve,
      users: usersResolve,
      invites: invitesResolve,
    }
  });
}
