import controller from './venueDeliveryZones.controller'

/**
 * Routing function for venueDeliveryZones
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider, Permissions) {
  "ngInject";
  $stateProvider.state("main.dashboard.venueSettings.venueDeliveryZones", {
    url: "/venueDeliveryZones",
    requiresPermission:Permissions.VENUE_CREATE,
     views:{
      venueSettingsContent:{
        template: require("./venueDeliveryZones.tpl.html"),
        controller: controller.UID,
        controllerAs: "venueDeliveryZonesCtrl"
      }
    }
  });
}
