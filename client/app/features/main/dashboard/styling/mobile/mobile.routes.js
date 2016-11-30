
import controller from './mobile.controller';

/**
 * Routing function for mobile
 * @param  $stateProvider
 */

export default function routes($stateProvider, Permissions) {
  "ngInject";
  $stateProvider.state("main.dashboard.styling.mobile", {
    url: "/mobile",
    requiresPermission:Permissions.VENUE_CREATE,
    views:{
      stylingContent:{
        template: require("./mobile.tpl.html"),
        controller: controller.UID,
        controllerAs: "vm"
      }
    }
  });
}
