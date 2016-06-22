
import controller from './bookingSettings.controller';

/**
 * Routing function for bookingSettings
 * @param  $stateProvider
 */

export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("main.dashboard.bookings.bookingSettings", {
    url: "/bookingSettings",
    template: require("./bookingSettings.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm"
  });
}
