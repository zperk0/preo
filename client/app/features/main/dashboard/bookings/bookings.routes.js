
import controller from './bookings.controller';

/**
 * Routing function for bookings
 * @param  $stateProvider
 */

export default function routes($stateProvider, Permissions) {
  "ngInject";
  $stateProvider.state("main.dashboard.bookings", {
    url: "/bookings",
    template: require("./bookings.tpl.html"),
    controller: controller.UID,
    requiresPermission:Permissions.BOOKINGS,
    controllerAs: "vm"
  });
}
