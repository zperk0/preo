
import controller from './bookingList.controller';

/**
 * Routing function for bookingList
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  'ngInject';
  $stateProvider.state("main.dashboard.bookings.bookingList", {
    url: "/bookingList",
    template: require("./bookingList.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm"
  });
}
