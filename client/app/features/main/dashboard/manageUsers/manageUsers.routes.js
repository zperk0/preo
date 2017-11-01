
import controller from './manageUsers.controller';
import usersDetailsController from './userDetails/userDetails.controller';
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
    url: "/users",
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

  $stateProvider.state("main.dashboard.manageUsers.invite", {
    url: "/invite",
    views: {
      'userDetailView': {
        //template: require("./users/users.tpl.html"),
        controller: usersDetailsController.UID,
        requiresPermission:Permissions.OFFERS,
        controllerAs: "$userDetails"
      }
    }
  });

  $stateProvider.state("main.dashboard.manageUsers.detail", {
    url: "/:userId",
    views: {
      'userDetailView': {
        template: require("./userDetails/userDetails.tpl.html"),
        controller: usersDetailsController.UID,
        requiresPermission:Permissions.OFFERS,
        controllerAs: "$userDetails",
        resolve: {
          user: ($q, users, $stateParams, $state, $timeout) => {

            const userId = $stateParams.userId;
            const filtered = users.filter((user) => {
              return +user.id === +userId;
            });

            if (filtered.length) {
              return $q.when(filtered[0]);
            }

            $timeout(() => {
              $state.go("main.dashboard.manageUsers");
            });

            return $q.reject();
          }
        }
      }
    }
  });
}
