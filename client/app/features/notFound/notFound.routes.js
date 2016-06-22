
import controller from './notFound.controller';

/**
 * Routing function for notFound
 * @param  $stateProvider
 */

export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("notFound", {
    url: "/404",
    template: require("./notFound.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm"
  });
}
