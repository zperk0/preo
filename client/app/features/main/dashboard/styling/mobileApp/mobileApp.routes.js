
import controller from './mobileApp.controller';

/**
 * Routing function for mobile
 * @param  $stateProvider
 */

export default function routes($stateProvider, Permissions) {
  "ngInject";
  $stateProvider.state("main.dashboard.styling.mobileApp", {
    url: "/mobileApp",
    requiresPermission:Permissions.VENUE_CREATE,
    views:{
      stylingContent:{
        template: require("./mobileApp.tpl.html"),
        controller: controller.UID,
        controllerAs: "vm"
      }
    }
  });
}
