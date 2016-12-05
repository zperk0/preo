
import controller from './bookingSettings.controller';

/**
 * Routing function for bookingSettings
 * @param  $stateProvider
 */

export default function routes($stateProvider, Permissions) {
  "ngInject";
  $stateProvider.state("main.dashboard.bookings.bookingSettings", {
    url: "/bookingSettings",
    template: require("./bookingSettings.tpl.html"),
    controller: controller.UID,
    requiresPermission:Permissions.BOOKINGS,
    controllerAs: "vm"
  });
}
