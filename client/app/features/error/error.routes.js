
import controller from './error.controller';

/**
 * Routing function for error
 * @param  $stateProvider
 */

export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("error", {
    url: "/error/:code",
    template: require("./error.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm"
  });
}
