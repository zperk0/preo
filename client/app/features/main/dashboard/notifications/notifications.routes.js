
import controller from './notifications.controller';

/**
 * Routing function for notifications
 * @param  $stateProvider
 */

export default function routes($stateProvider, Permissions) {
  "ngInject";
  $stateProvider.state("main.dashboard.notifications", {
    url: "/notifications",
    template: require("./notifications.tpl.html"),
    controller: controller.UID,
    requiresPermission:Permissions.VENUE_CREATE,
    controllerAs: "notificationsCtrl",
    resolve:{
      // authenticated -> this is from main.routes.js and makes sure there is an USER and a VENUE set in userService and venueService
      maps:function(authenticated){
        "ngInject";
        return authenticated;
      }
    }
  });
}
