
import controller from './emails.controller';

/**
 * Routing function for emails
 * @param  $stateProvider
 */

export default function routes($stateProvider, Permissions) {
  "ngInject";
  $stateProvider.state("main.dashboard.styling.emails", {
    url: "/emails",
    requiresPermission:Permissions.VENUE_CREATE,
    views:{
      stylingContent:{
        template: require("./emails.tpl.html"),
        controller: controller.UID,
        controllerAs: "emailsCtrl"
      }
    }
  });
}
