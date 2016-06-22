
import controller from './styling.controller';

/**
 * Routing function for styling
 * @param  $stateProvider
 */

export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("main.dashboard.styling", {
    url: "/styling",
    template: require("./styling.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm"
  });
}
