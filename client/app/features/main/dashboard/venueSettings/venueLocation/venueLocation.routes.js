
import controller from './venueLocation.controller'

/**
 * Routing function for venueLocation
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("main.dashboard.venueSettings.venueLocation", {
    url: "/venueLocation",
     views:{
      venueSettingsContent:{
        template: require("./venueLocation.tpl.html"),
        controller: controller.UID,
        controllerAs: "venueLocationCtrl"
      }
    }
  });
}
