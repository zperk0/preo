
import controller from './bookings.controller';

/**
 * Routing function for bookings
 * @param  $stateProvider
 */

export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("main.dashboard.bookings", {
    url: "/bookings",
    template: require("./bookings.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm"
  });
}
