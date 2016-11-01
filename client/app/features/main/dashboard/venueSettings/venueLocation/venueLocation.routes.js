
import controller from './venueLocation.controller'

/**
 * Routing function for venueLocation
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider.state("venueLocation", {
    url: "/venueLocation",
    template: require("./venueLocation.tpl.html"),
    controller: controller.UID,
    controllerAs: "venueLocation"
  });
}
