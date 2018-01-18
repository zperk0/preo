
import controller from './manageUsers.controller';
import usersDetailsController from './userDetails/userDetails.controller';
import inviteController from './invite/invite.controller';
import permissionsResolve from './permissions.resolve';
import usersResolve from './users.resolve';
import invitesResolve from './invites.resolve';
import entitiesResolve from 'app/components/contextual/contextualDrawer/entities/entities.resolve';


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
      entities: entitiesResolve,
    }
  });

  $stateProvider.state("main.dashboard.manageUsers.newInvite", {
    url: "/invite/new",
    views: {
      'userDetailView': {
        template: require("./invite/invite.tpl.html"),
        controller: inviteController.UID,
        requiresPermission: Permissions.OFFERS,
        controllerAs: '$invite',
        resolve: {
          invite: (UserService, StateService,$rootScope, invites) => {
            const invite = new Preoday.Invite({
              invites: {
                role: 'ADMIN',
                venueIds: StateService.venue && StateService.venue.id ? [StateService.venue.id] : [],
                groupIds: [],
                channelId: null,
              },
              venueId: StateService.venue && StateService.venue.id,
              channelId: StateService.channel && StateService.channel.id,
              createdBy: UserService.user.id,
            });

            invites.push(invite);

            return invite;
          }
        }
      }
    }
  });

  $stateProvider.state("main.dashboard.manageUsers.invite", {
    url: "/invite/:inviteId",
    views: {
      'userDetailView': {
        template: require("./invite/invite.tpl.html"),
        controller: inviteController.UID,
        requiresPermission: Permissions.OFFERS,
        controllerAs: '$invite',
        resolve: {
          invite: ($q, invites, $stateParams, $state, $timeout) => {

            const inviteId = $stateParams.inviteId;
            const filtered = invites.filter((invite) => {
              return +invite.id === +inviteId;
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

  $stateProvider.state("main.dashboard.manageUsers.detail", {
    url: "/:userId/:role",
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
