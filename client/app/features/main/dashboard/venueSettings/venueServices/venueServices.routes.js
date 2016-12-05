import controller from './venueServices.controller'

/**
 * Routing function for venueServices
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider, Permissions) {
  "ngInject";
  $stateProvider.state("main.dashboard.venueSettings.venueServices", {
    url: "/venueServices",
    requiresPermission:Permissions.VENUE_CREATE,
     views:{
      venueSettingsContent:{
        template: require("./venueServices.tpl.html"),
        controller: controller.UID,
        controllerAs: "venueServicesCtrl"
      }
    }
  });
}
