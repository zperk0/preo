
import controller from './bookingMenus.controller';

/**
 * Routing function for bookingMenus
 * @param  $stateProvider
 */

export default function routes($stateProvider, Permissions) {
  "ngInject";
  $stateProvider.state("main.dashboard.bookings.bookingMenus", {
    url: "/bookingMenus",
    template: require("./bookingMenus.tpl.html"),
    controller: controller.UID,
    requiresPermission:Permissions.BOOKINGS,
    controllerAs: "vm"
  });
}
