
import controller from './main.controller';

/**
 * Routing function for main
 * @param  $stateProvider
 */

export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("main", {
    url: "/:venueId/main",
    abstract: true,
    template: require("./main.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm"
  });
}
