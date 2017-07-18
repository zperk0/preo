
import controller from './venueDetails.controller'

/**
 * Routing function for venueDetails
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider, Permissions) {
  "ngInject";
  $stateProvider.state("main.dashboard.venueSettings.venueDetails", {
    url: "/venueDetails",
    requiresPermission:Permissions.VENUE_CREATE,
     views:{
      venueSettingsContent:{
        template: require("./venueDetails.tpl.html"),
        controller: controller.UID,
        controllerAs: "venueDetailsCtrl"
      }
    }
  });
}
