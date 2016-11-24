
import controller from './bookingList.controller';

/**
 * Routing function for bookingList
 * @param  $stateProvider
 */

export default function routes($stateProvider, Permissions) {
  "ngInject";
  $stateProvider.state("main.dashboard.bookings.bookingList", {
    url: "/bookingList",
    template: require("./bookingList.tpl.html"),
    controller: controller.UID,
    requiresPermission:Permissions.BOOKINGS,
    controllerAs: "vm"
  });
}
